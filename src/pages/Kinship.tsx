import { useState } from 'react';
import { Link } from 'react-router-dom';
import { KinshipLogic } from '@/utils/kinshipLogic';
import { CloudDecoration } from '@/components/decorations/CloudDecoration';

function Kinship() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleCalculate = () => {
    const logic = new KinshipLogic();
    const chain = input.split('的').filter(word => word.trim() !== '');
    const relationship = logic.getRelationship(chain);
    setResult(relationship);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 relative overflow-hidden">
      {/* 新春装饰 */}
      <CloudDecoration />
      
      {/* 顶部装饰线条 */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      {/* 底部装饰 */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
      
      <div className="relative z-10">
        {/* 返回链接 */}
        <Link to="/" className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-primary transition-colors group">
          <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回首页
        </Link>
        
        {/* 标题区域 */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-10 h-0.5 bg-gradient-to-r from-transparent to-secondary" />
            <span className="text-secondary text-sm tracking-widest">家族关系</span>
            <div className="w-10 h-0.5 bg-gradient-to-l from-transparent to-secondary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground font-serif">亲戚计算器</h1>
          <p className="text-muted-foreground mt-2">输入关系链，快速计算亲属称呼</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="mb-8 p-6 bg-card rounded-xl border border-border cloud-pattern animate-fade-in card-glow-hover" style={{ animationDelay: '100ms' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入关系，如：爸爸的爸爸"
              className="w-full p-4 border border-border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background input-glow transition-shadow duration-300"
            />

            <button
              onClick={handleCalculate}
              className="w-full p-4 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all duration-200 hover:shadow-lg btn-pulse"
            >
              计算
            </button>

            {result && (
              <div className="mt-6 p-6 border-l-4 border-primary bg-accent/50 rounded-r-lg result-unfold glow-shadow">
                <p className="text-2xl font-bold font-serif gradient-text">结果：{result}</p>
              </div>
            )}
          </div>

          <div className="border border-border rounded-xl p-6 bg-card bat-pattern animate-fade-in card-glow-hover" style={{ animationDelay: '200ms' }}>
            <h2 className="text-2xl font-bold mb-4 font-serif text-foreground">使用说明</h2>

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2 font-serif text-foreground">适用范围</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>直系亲属：父母、祖父母、曾祖父母、子女、孙子女等</li>
                <li>兄弟姐妹：哥哥、弟弟、姐姐、妹妹</li>
                <li>父亲的兄弟姐妹及配偶：伯伯、叔叔、姑姑、伯母、婶婶、姑父</li>
                <li>母亲的兄弟姐妹及配偶：舅舅、姨妈、舅妈、姨父</li>
                <li>堂亲：堂哥、堂弟、堂姐、堂妹（父亲兄弟的子女）</li>
                <li>表亲：表哥、表弟、表姐、表妹（父亲姐妹、母亲兄弟姐妹的子女）</li>
                <li>侄辈甥辈：侄子、侄女、外甥、外甥女</li>
                <li>姻亲：岳父、岳母、公公、婆婆、女婿、儿媳、嫂子、弟媳、姐夫、妹夫等</li>
                <li>其他远亲：伯祖父、叔祖父、姑祖母、舅公、姨婆等</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2 font-serif text-foreground">功能特点</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>正向查询：输入关系链，返回称呼（如：爸爸的爸爸 → 爷爷）</li>
                <li>支持同义词：父亲、爸、爹等都会映射到"爸爸"</li>
                <li>支持复杂关系：支持多步关系链计算</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 font-serif text-foreground">注意事项</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>方言差异：主要基于普通话标准称呼，收录了一些常见方言（如姥爷、外公）</li>
                <li>复杂关系：非常复杂的关系可能无法直接计算，需要多步推导</li>
                <li>性别区分：计算时考虑性别因素（如儿子/女儿）</li>
                <li>同义词处理：将常见同义词映射到标准称呼</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 右下角署名 */}
        <div className="absolute bottom-4 right-4 text-right animate-fade-in" style={{ animationDelay: '800ms' }}>
          <p className="text-muted-foreground text-xs">
            By 子非余
          </p>
        </div>
      </div>
    </div>
  );
}

export default Kinship;
