import { readAIStream } from '../src/stream';
import { streamFixture } from './streamFixture';

describe('客服流式解析', () => {
  test('CRLF 拆包、多行数据与无尾空行完成帧', async () => {
    const stream = streamFixture(['event: message\r', '\ndata: {"content":\r\ndata: "你好"}\r\n\r', '\nevent: done\r\ndata: {}']);
    const onContent = jest.fn();
    expect(await readAIStream(stream.response, new AbortController().signal, { onContent })).toBe('你好');
    expect(onContent).toHaveBeenCalledWith('你好');
    expect(stream.reader.releaseLock).toHaveBeenCalled();
  });
  test('正文断流报告失败且已到达片段可保留', async () => {
    const stream = streamFixture(['data: {"content":"部分回复"}\n\n']);
    const onContent = jest.fn();
    await expect(readAIStream(stream.response, new AbortController().signal, { onContent })).rejects.toThrow('提前中断');
    expect(onContent).toHaveBeenCalledWith('部分回复');
  });
});
