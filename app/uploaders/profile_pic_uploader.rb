class ProfilePicUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def extension_allowlist
    %w[jpg jpeg gif png]
  end

  def default_url(*args)
    ActionController::Base.helpers.asset_path("fallback/" + [version_name, "default.png"].compact.join('_'))
  end

  process resize_to_fit: [800, 800]

  version :thumb do
    process resize_to_fill: [100, 100]
  end

  version :medium do
    process resize_to_fit: [300, 300]
  end

  def filename
    "profile_picture_#{model.id}.jpg" if original_filename
  end
end
