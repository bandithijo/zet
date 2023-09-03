require 'find'
require 'fileutils'

# Define the source and destination directories
source_directory = '.'
destination_file = 'DEX.md'

# Initialize an array to store the formatted headers
formatted_headers = []

# Regular expression to match the datetime format
datetime_regex = /\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}/

# Iterate through the files in the source directory
Find.find(source_directory) do |file_path|
  next unless File.file?(file_path) && file_path =~ /\.md$/

  # Read the file content
  content = File.read(file_path)

  # Extract the first header (assuming it's the only one) using regex
  header = content.match(/^# (.+)$/)&.captures&.first

  # Check if a valid header was found and if it contains a datetime
  if header && header.match(datetime_regex)
    # Remove any leading/trailing whitespace, colons, and question marks,
    # and convert to lowercase
    formatted_header = header.strip.downcase.gsub(/[?:]/, '')

    # Replace spaces with hyphens
    formatted_header.gsub!(' ', '-')

    # Append the formatted header to the array
    formatted_headers << "[[#{formatted_header}]]"
  end
end

# Write the formatted headers to the destination file
File.open(destination_file, 'w') do |file|
  file.puts("# DEX\n\n")
  formatted_headers.each { |line| file.puts(line) }
end

puts "Formatted headers written to #{destination_file}"
