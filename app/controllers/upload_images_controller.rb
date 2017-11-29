# frozen_string_literal: true

class UploadImagesController < ApplicationController
  before_action :logged_in?

  def create
    # TODO: Upload file
    @upload_image = upload_image_params
    filenames = @upload_image[:files].map(&:original_filename).map do |filename|
      { name: filename, url: "http://example.com/#{filename}" }
    end

    respond_to do |format|
      if true
        format.json { render json: filenames }
      else
        format.json { render json: ['error'], status: :unprocessable_entity }
      end
    end
  end

  private

  def upload_image_params
    params.require(:upload_image).permit(files: [])
  end
end
