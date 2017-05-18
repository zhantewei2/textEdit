import { TextEditorPage } from './app.po';

describe('text-editor App', () => {
  let page: TextEditorPage;

  beforeEach(() => {
    page = new TextEditorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
