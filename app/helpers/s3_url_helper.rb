module S3UrlHelper
  def s3_url(filename)
    "https://s3.amazonaws.com/#{ENV['S3_BUCKET_NAME']}/#{filename}"
  end
end
