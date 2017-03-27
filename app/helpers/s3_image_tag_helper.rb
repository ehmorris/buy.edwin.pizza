module S3ImageTagHelper
  def s3_image_tag(filename)
    raw "<img src=\"https://s3.amazonaws.com/#{ENV['S3_BUCKET_NAME']}/#{filename}\" />"
  end
end
