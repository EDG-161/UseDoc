const metodos requiere ('../app/routes/modulos');

var assert = require('assert');
 
describe('metodos', function() {
  describe('crear()', function() {
    it('debe retornar -1 cuando el valor no esta presente', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});