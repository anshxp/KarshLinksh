// At the top of the file
import UAParser from 'ua-parser-js';

// Inside your test or setup function
describe('LinkService UAParser Tests', () => {
  it('should parse user agent correctly', () => {
    const parser = new UAParser.UAParser(); // ✅ fixed
    const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';
    parser.setUA(ua);
    const result = parser.getResult();

    console.log(result.browser.name); // e.g., "Firefox", "Chrome"
    expect(result.browser.name).toBeDefined();
  });
});
