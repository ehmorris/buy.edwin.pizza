module S3ImageTagHelper
  def s3_image_tag(filename)
    raw "<img loading='lazy' src=\"https://s3.amazonaws.com/#{ENV['S3_BUCKET_NAME']}/#{filename}\" />"
  end
end
