import '../../src/utils';

describe('String.prototype.titleCase', () => {
  it('title cases strings', () => {
    expect('foo'.titleCase()).to.equal('Foo');
  });

  it('doesn\'t break on strings that don\'t start with a letter', () => {
    expect('1aaaaa'.titleCase()).to.equal('1aaaaa');
  });
});
