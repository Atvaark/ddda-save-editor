import DDDASaveDom from '../src/ddda-save-dom.js';

describe('The DDDASaveDom class', () => {
  const loadSavegame = (text) => {
    const parser = new DOMParser();
    const saveDocument = parser.parseFromString(text, 'text/xml');
    return saveDocument;
  };

  let saveDom;

  beforeEach(() => {
    saveDom = new DDDASaveDom();
  });

  it('should parse empty savegames documents', () => {
    const savegame = loadSavegame(`<?xml version="1.0" encoding="utf-8"?>
      <class/>`);

    const rootClass = saveDom.parse(savegame);

    expect(rootClass).not.toBe(null);
  });

  it('should parse savegame documents with default values', () => {
    const savegame = loadSavegame(`<?xml version="1.0" encoding="utf-8"?>
      <class type="">
        <bool value="false"/>
        <f32 value="0.000000"/>
        <s8 value="0"/>
        <s16 value="0"/>
        <s32 value="0"/>
        <s64 value="0"/>
        <u8 value="0"/>
        <u16 value="0"/>
        <u32 value="0"/>
        <u64 value="0"/>
        <string value=""/>
        <vector3 x="0.000000" y="0.000000" z="0.000000"/>
        <time year="1970" month="1" day="1" hour="1" minute="0" second="0"/>
        <class type=""/>
        <classref type=""/>
        <array type="" count="0"/>
      </class>
      `);
    const rootClass = saveDom.parse(savegame);

    expect(rootClass).not.toBe(null);
  });

  it('should parse the root class attributes', () => {
    const savegame = loadSavegame(`<?xml version="1.0" encoding="utf-8"?>
      <class name="rootClassName" type="rootClassType"/>`);

    const rootClass = saveDom.parse(savegame);

    expect(rootClass.name).toBe('rootClassName');
    expect(rootClass.type).toBe('rootClassType');
  });

  it('should parse the root class members', () => {
    const savegame = loadSavegame(`<?xml version="1.0" encoding="utf-8"?>
      <class>
        <u32 name="testMemberName" value="1"/>
      </class>`);

    const rootClass = saveDom.parse(savegame);

    expect(rootClass.testMemberName).not.toBe(undefined);
    expect(rootClass.testMemberName.value).toBe('1');
  });
});
