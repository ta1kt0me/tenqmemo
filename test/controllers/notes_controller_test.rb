require './test/test_helper'

class NotesControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get notes_url
    assert_response :success
  end

  test 'should get new' do
    sign_in_user do
      get new_note_url
      assert_response :success
    end
  end

  test 'should create note' do
    sign_in_user do
      assert_difference('Note.count') do
        post notes_url, params: { note: { body: 'note body' } }
      end

      assert_redirected_to note_path(Note.last)
    end
  end

  test 'should show note' do
    @note = notes(:one)
    get note_url(@note)
    assert_response :success
  end

  test 'should get edit' do
    sign_in_user do
      @note = notes(:one)
      get edit_note_url(@note)
      assert_response :success
    end
  end

  test 'should update note' do
    sign_in_user do
      @note = notes(:one)
      patch note_url(@note), params: { note: { body: 'note body' } }
      assert_redirected_to note_path(@note)
    end
  end

  test 'should destroy note' do
    sign_in_user do
      @note = notes(:one)
      assert_difference('Note.count', -1) { delete note_url(@note) }

      assert_redirected_to notes_path
    end
  end
end
