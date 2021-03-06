# frozen_string_literal: true

class UploadImagesController < ApplicationController
  before_action :logged_in?

  def create
    respond_to do |format|
      @image = upload_image_params.dig :file
      begin
        Piet.optimize(@image.path, quolity: 50)
        res = Cloudinary::Uploader.upload(
          @image,
          crop: "limit",
          tags: "tenqmemo",
          resource_type: :auto,
          folder: "tenqmemo",
          use_filename: true
        )
        file = { name: @image.original_filename, url: res["secure_url"] }
        format.json { render json: file }
      rescue CloudinaryException => e
        format.json { render json: e.messsge, status: :unprocessable_entity }
      end
    end
  end

  private

  def upload_image_params
    params.require(:upload_image).permit(:file)
  end
end
