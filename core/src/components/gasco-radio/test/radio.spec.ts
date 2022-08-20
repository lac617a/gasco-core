import { GascoRadio } from '../gasco-radio.tsx';

describe('gasco-radio', () => {
  it('should set a default value', async () => {
    const gasco_radio = new GascoRadio();

    await gasco_radio.connectedCallback();

    expect(gasco_radio.value).toEqual('gasco-rb-0');
  });
});
