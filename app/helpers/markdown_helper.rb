module MarkdownHelper
  def md2html(text)
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, md_extensions)
    markdown.render(text).html_safe
  end

  def md_extensions
    {
      autolink: true,
      disable_indented_code_blocks: true,
      fenced_code_blocks: true,
      footnotes: true,
      highlight: true,
      no_intra_emphasis: true,
      quote: true,
      space_after_headers: true,
      strikethrough: true,
      tables: true
    }
  end
end
