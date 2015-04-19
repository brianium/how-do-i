jest.dontMock('../');

describe('youtube', function () {
  let yt = require('../');

  it('can generate a query uri given a token and a query parameter', function () {
    let uri = yt.uri('mytoken', 'hello');
    let expected = 'https://www.googleapis.com/youtube/v3/search?access_token=mytoken&part=id,snippet&q=hello&type=video&videoEmbeddable=true';

    expect(uri).toBe(expected);
  });

  it('can generate a video url', function () {
    let video = {
      id: {
        videoId: '12345'
      }
    };
    let videoUrl = yt.videoUrl(video);
    let expected = 'http://www.youtube.com/v/12345?version=3&enablejsapi=1&autoplay=1';

    expect(videoUrl).toBe(expected);
  });
});
