#:doc Heiti - A Simple HTTP Server, Which redirects '/data' urls from Localhost to VEC Test Bus Domain
require 'webrick'
require 'net/http'

is_coco_set = false
#Change this path to point to your apps root folder.
#spath = File.expand_path 'D:\MyWorkspace\troubleshoot-wizard\ngapp'
spath = File.expand_path '~/MyWorkspace/JFC/ngapp'

host = { 'root' => spath, 'port' => 8484}
busdomain = { 'url' => '127.0.0.1', 'port' =>'8080' }
staticfiles = [".js", ".css", ".html", ".gif", ".jpg", ".jpeg", ".mpg", ".mpge", ".ico", ".doc", ".xls", ".svg", ".txt", ".pdf", ".png", ".ico", ".woff", ".eot", ".ttf", ".json"]

puts "Host Path : " + host['root']

server = WEBrick::HTTPServer.new :Port => host['port'], :DocumentRoot => host['root']
server.mount_proc '/data' do |req, res|
  rs = req.request_uri.to_s #:doc Getting Request URL as string value.
  found = false;

  #:doc Looping through the static file array to check whether the request is for Static File or not.
  staticfiles.each do |item|
    if rs.index('.') != nil && rs.index(item) != nil
      found = true
      break
    end
  end

	if rs.index('/data/payment')
	 res.set_redirect WEBrick::HTTPStatus::TemporaryRedirect, '/resources/mockdata/payment.json'
	  found = true
	end
  #:doc If the request if not for static file, the request is processed into a VEC Bus Domain request and the response is served.
  if found.equal?(false)
    mvs = req.meta_vars
    ret = nil
    additional_header = {
	  'login_id' => "",   #uatauser94
	  'user_oid' => "",
	  "Cookie" => ""
    }
    begin
      Net::HTTP.start(busdomain['url'], busdomain['port']) do |http|
        addr = req.request_uri.to_s
        addr['http://localhost:82'] = ""

		puts "##LOG##", busdomain['url'] + addr, "=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3=3"

        #:doc GET request is handled by a normal HTTP GET Method.
        if mvs['REQUEST_METHOD'] == 'GET'
          ret = http.get(addr, additional_header)
          #:doc POST request has be handled as HTTP REQUEST in order to support the request payload.
        elsif mvs['REQUEST_METHOD'] == 'POST'
          request = Net::HTTP::Post.new(addr.to_s)
          additional_header.each do |key,val|
            request.add_field key, val
          end
          ret = http.request(request, req.body)
          #:doc HEAD request is handled by a normal HTTP HEAD Method.
        elsif mvs['REQUEST_METHOD'] == 'HEAD'
          ret = http.head(addr, additional_header)
          #:doc OPTIONS request is handled by a normal HTTP OPTIONS Method.
        elsif mvs['REQUEST_METHOD'] == 'OPTIONS'
          ret = http.options(addr, additional_header)
        end
      end
      case ret
      when Net::HTTPSuccess then
        ret.response.each_header do |key,value|
          if (key == 'Set-cookie' || key == 'set-cookie') && value.index("SESSIONID") == nil
            additional_header['Cookie'] = additional_header['Cookie'] + '; ' + value
            res.cookies.push(value)
          end
        end
        if is_coco_set.eql?(false)
          res.cookies.push('; add1=AQIC5wM2LY4SfcxfNJ')
          is_coco_set = true
        end
        res.body = ret.body
      when Net::HTTPRedirection then
        puts "##REDIRECTION##"
      else
        ret.error!
      end
    rescue Exception => e
      puts "##ERROR##", e.message, e.inspect
    end
  else
    #:doc Handle All requests for Static Files.
    server.service(req, res)
  end
end

#:doc Handle Terminal Close Signals.
trap 'TERM' do server.shutdown end
trap 'INT' do server.shutdown end
#:doc Method call for starting the server.
server.start
