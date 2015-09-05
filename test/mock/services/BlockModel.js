

/**
 * Mock les Block Models
 * @param BlockFactory
 * @param isDouble
 */
function mockBlockModels(BlockFactory, isDouble) {
  var BlockModel = [];

  var bf = new BlockFactory();
  [1, 2, 3].forEach(function() {
    var blockOpts = {};
    if (isDouble) {
      blockOpts = {
        content:'<p>Contenu</p>',
        order:'text-text',
        type:'double',
        nbColumns:2
      };
    } else {
      blockOpts = {
        type: 'text'
      };
    }

    BlockModel.push(bf.create(blockOpts));
  });
  return BlockModel;
}
