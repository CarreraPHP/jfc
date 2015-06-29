# Iterates over files and subdirectories in directorie[s] given as arguments
# and adds raw text of those files to merged.txt in the working directory
# where the script is called
 
# Call like this:
# ruby merge.rb {absolute path portion to delete} {directory to scan} [{directory to scan}]
# For example:
# ruby merge.rb ~\MyWorkspace\JFC\ ~\MyWorkspace\JFC\

# save first argument as portion of path to delete from output, then remove from argument array
dirTree = File.absolute_path(ARGV[0])
ARGV.shift

# create or open the merged.txt file for writing (in working directory)
File.open(dirTree + '\classes.js','w+') do |mergedFile|
  puts "directory Tree --- " + dirTree
 
  # For each argument given,
  ARGV.each do |arg|
    # find its real path (to account for users adding trailing slashes or not), and
    topDir = File.absolute_path(arg)
    # create an array of all the files in that directory and its subdirectories.
    filesInDir = Dir["#{topDir}/**/**/*.*"]
    # Then for each file in that array,
    filesInDir.each do |file|
      # add a header to merged.txt with the relative path of that file
      # (removing first argument given to script)
      unless File.basename(file) =~ /eot|woff|woff2|otf|svg|ttf|html|css|less|ico|jpg|png|gif|modernizr|fancybox|jquery/
        relativePath = File.absolute_path(file).gsub("#{dirTree}","..")
        puts "processing: #{relativePath}"
        mergedFile << "\n\n//=========================================================\n"
        mergedFile << "//#{relativePath}\n"
        mergedFile << "//=========================================================\n\n"
        # open the current file and add each line to merged.txt
        text = File.open(file, 'r').read
        text.each_line do |line|
          mergedFile << line
        end
      end
    end
  end
 
end
