# frozen_string_literal: true

class UploadImagesController < ApplicationController
  before_action :logged_in?

  def create
    # TODO: Upload file
    @upload_image = upload_image_params
    filename = @upload_image[:file].original_filename
    file = { name: filename, url: "http://example.com/#{filename}" }

    respond_to do |format|
      if true
        format.json { render json: file }
      else
        format.json { render json: ['error'], status: :unprocessable_entity }
      end
    end
  end

  private

  def upload_image_params
    params.require(:upload_image).permit(:file)
  end
end
