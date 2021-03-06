jest.dontMock('../');

import * as yt from '../';

describe('youtube', function () {
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
    let expected = 'http://www.youtube.com/embed/12345?version=3&enablejsapi=1&autoplay=1';

    expect(videoUrl).toBe(expected);
  });

  it('can get a relevant result', function () {
    let result = {
      items: [
        {
          id:1,
          snippet: {
            title: 'This is supposed to be more relevant'
          }
        },
        {
          id: 2,
          snippet: {
            title: 'How to be more relevant'
          }
        }
      ]
    }

    let relevant = yt.relevant(result);
    expect(relevant.id).toBe(2);
  });
});
