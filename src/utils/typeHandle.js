  function  typeCasting(key){
  switch (key) {
    case 'stomaCount':
      return '气孔数量';
    case 'dregsCount':
      return '夹渣数量';
    case 'tumorCount':
      return '焊瘤数量';
    case 'crackCount':
      return '裂纹数量';
    case 'biteCount':
      return '咬边数量';
    case 'nosolvedCount':
      return '未熔合数量';
    case 'noweldedCount':
      return '未焊透数量';
    case 'burnCount':
      return '烧穿数量';
    case 'weldingCount':
      return '焊缝数量';
    case 'poorformCount':
      return '形成不良数量';
    case 'concaveCount':
      return '内凹数量';
    case 'fakedefectCount':
      return '伪缺陷数量';
  }
}
export default typeCasting;
