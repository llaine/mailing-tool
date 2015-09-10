'use strict';

describe('Service: BlockFactory', function() {
  beforeEach(module('newsletterEditorApp'));

  var _BlockFactory;

  /**
   * Test le prototype des block.
   * @param block
   */
  function testBlockAttrs(block) {
    expect(block.id).toBeDefined();
    expect(block.metaStyle).toBeDefined();
    expect(block.contentStyle).toBeDefined();
    expect(block.type).toBeDefined();
    expect(typeof block.toString).toBe('function');
    expect(typeof block.setStyle).toBe('function');

    // Le contenu des blocks
    if (block.type === 'double' || block.type === 'social') {
      expect(block.cells.length).toEqual(2);
    } else if(block.type !== 'divider') {
      expect(block.content).toBeDefined();
    }

    // Les block action.
    if (block.type === 'unsub' ||
        block.type === 'online' ||
        block.type === 'button') {
      expect(block.attributes).toBeDefined();
    }

  }

  beforeEach(inject(function(BlockFactory) {
    _BlockFactory = new BlockFactory();
  }));

  it('doit avoir une fonction permettant de créer des Block', function() {
    expect(_BlockFactory.create).toBeDefined();
  });

  describe('doit permettre de créer des block simple', function() {
    describe('des block de type text', function() {
      var blockTxt;
      beforeEach(function() {
        blockTxt = _BlockFactory.create({type:'text'});
      });
      it('doit avoir le bon prototype', function() {
        testBlockAttrs(blockTxt);
      });

      it('doit avoir une fonction toString', function() {
        expect(typeof blockTxt.toString()).toEqual('string')
      });

      it('doit avoir une fonction setStyle', function() {
        blockTxt.setStyle({color:'black'}, 'p');
        expect(blockTxt.contentStyle).toEqual({p:{color:'black'}});
      });
    });
    describe('des block de types image', function() {
      var blockFile;
      beforeEach(function() {
        blockFile = _BlockFactory.create({type:'file'});
      });
      it('doit avoir le bon prototype', function() {
        testBlockAttrs(blockFile);
      });

      it('doit avoir une fonction toString', function() {
        expect(typeof blockFile.toString()).toEqual('string')
      });

      it('doit avoir une fonction setStyle', function() {
        blockFile.setStyle({color:'black'}, 'p');
        expect(blockFile.contentStyle).toEqual({p:{color:'black'}});
      });
    });
    describe('des block de types divider', function() {
      var blockFile;
      beforeEach(function() {
        blockFile = _BlockFactory.create({type:'divider'});
      });
      it('doit avoir le bon prototype', function() {
        testBlockAttrs(blockFile);
      });

      it('doit avoir une fonction toString', function() {
        expect(typeof blockFile.toString()).toEqual('string')
      });

      it('doit avoir une fonction setStyle', function() {
        blockFile.setStyle({color:'black'}, 'p');
        expect(blockFile.contentStyle).toEqual({p:{color:'black'}});
      });
    });
    describe('des block de types lien de désinscription', function() {
      var blockFile;
      beforeEach(function() {
        blockFile = _BlockFactory.create({type:'divider'});
      });
      it('doit avoir le bon prototype', function() {
        testBlockAttrs(blockFile);
      });

      it('doit avoir une fonction toString', function() {
        expect(typeof blockFile.toString()).toEqual('string')
      });

      it('doit avoir une fonction setStyle', function() {
        blockFile.setStyle({color:'black'}, 'p');
        expect(blockFile.contentStyle).toEqual({p:{color:'black'}});
      });
    });
    describe('des block de types lien de visualisation en ligne', function() {
      var blockFile;
      beforeEach(function() {
        blockFile = _BlockFactory.create({type:'online'});
      });
      it('doit avoir le bon prototype', function() {
        testBlockAttrs(blockFile);
      });

      it('doit avoir une fonction toString', function() {
        expect(typeof blockFile.toString()).toEqual('string')
      });

      it('doit avoir une fonction setStyle', function() {
        blockFile.setStyle({color:'black'}, 'p');
        expect(blockFile.contentStyle).toEqual({p:{color:'black'}});
      });
    });
    describe('des block de types bouton', function() {
      var blockFile;
      beforeEach(function() {
        blockFile = _BlockFactory.create({type:'button'});
      });
      it('doit avoir le bon prototype', function() {
        testBlockAttrs(blockFile);
      });

      it('doit avoir une fonction toString', function() {
        expect(typeof blockFile.toString()).toEqual('string')
      });

      it('doit avoir une fonction setStyle', function() {
        blockFile.setStyle({color:'black'}, 'p');
        expect(blockFile.contentStyle).toEqual({p:{color:'black'}});
      });
    });
  });

  describe('doit permettre de créer des block multiples', function() {
    var blockDouble;
    var blockSocial;
    beforeEach(function() {
      blockDouble = _BlockFactory.create({type:'double', order:'text-text', nbColumns:2});
      blockSocial = _BlockFactory.create({type:'social', order:'text-file', nbColumns:2});
    });

    it('doit avoi le bon prototype', function() {
      testBlockAttrs(blockDouble);
      testBlockAttrs(blockSocial);
    });

    it('doit avoir une fonction toString', function() {
      var result = blockDouble.toString();
      var resultSocial = blockSocial.toString();

      // Comme c'est un block double, il contient une ligne et deux cellules.
      // Une ligne
      expect(result.length).toBe(1);
      // Deux cellules
      expect(result[0].length).toBe(2);
      expect(typeof result[0][0].html).toEqual('string');
      expect(typeof result[0][1].html).toEqual('string');

      // Une ligne
      expect(resultSocial.length).toBe(1);
      // Deux cellules
      expect(resultSocial[0].length).toBe(2);
      expect(typeof resultSocial[0][0].html).toEqual('string');
      expect(typeof resultSocial[0][1].html).toEqual('string');
    });

    it('doit avoir une fonction setStyle', function() {
      blockDouble.setStyle({color:'black'}, 'p');
      blockSocial.setStyle({color:'black'}, 'p');
      expect(blockDouble.contentStyle).toEqual({p:{color:'black'}});
      expect(blockSocial.contentStyle).toEqual({p:{color:'black'}});
    });
  });
});