import { Link } from 'react-router-dom';
import { CloudDecoration } from '@/components/decorations/CloudDecoration';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

function Email() {
  const [agreed, setAgreed] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-foreground p-4 sm:p-8 relative overflow-hidden">
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
            <span className="text-secondary text-sm tracking-widest">特别的人</span>
            <div className="w-10 h-0.5 bg-gradient-to-l from-transparent to-secondary" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground font-serif">一封匿名信</h1>
          <p className="text-muted-foreground mt-2">如果只有一封信 你会写给谁</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm animate-fade-in mb-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">收件人</label>
                <input 
                  type="text" 
                  className="w-full p-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="请输入你想写信的人"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">主题</label>
                <input 
                  type="text" 
                  className="w-full p-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="信件主题"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">内容</label>
                <textarea 
                  className="w-full p-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[200px] resize-none"
                  placeholder="在这里写下你的心声..."
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-in mb-8">
            <label className="flex items-start gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-muted-foreground leading-relaxed">
                我已阅读、理解并同意
                <button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAgreement(true);
                  }}
                  className="text-primary hover:underline ml-1"
                >
                  《匿名信函服务使用协议》（V1.0）
                </button>
              </span>
            </label>
          </div>

          <div className="text-center">
            <button 
              disabled={!agreed}
              className={`px-8 py-4 rounded-full font-bold transition-colors ${agreed ? 'bg-primary text-white hover:bg-primary/90' : 'bg-muted text-muted-foreground cursor-not-allowed'}`}
            >
              发送
            </button>
          </div>
        </div>

        {/* 协议弹窗 */}
        <Dialog open={showAgreement} onOpenChange={setShowAgreement}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>《匿名信函服务使用协议》</DialogTitle>
              <DialogDescription>协议版本号：V1.0 | 发布日期：2026年2月7日</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 text-sm">
              <p className="text-muted-foreground">
                在您（下称"用户"或"您"）使用「子非余」匿名信函服务（下称"本服务"）前，请务必审慎阅读、充分理解本协议全部条款，特别是关于责任限制、用户义务及争议解决的内容。您通过点击勾选、点击确认等主动行为完成发送流程，即视为您已<strong>完全理解、确认同意并承诺遵守</strong>本协议的全部约定，本协议即在您与服务提供方之间产生法律约束力。
              </p>

              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold mb-2">第一条 服务确认与用户资格</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>1.1 本服务为用户提供通过小程序向指定电子邮箱发送匿名信函的技术通道。服务提供方是<strong>中立的技术服务提供者</strong>。</p>
                    <p>1.2 <strong>您确认并保证</strong>：您是具有完全民事行为能力的自然人，或已取得必要授权。若您不具备前述资格，请勿使用本服务，否则应自行承担由此产生的一切后果。</p>
                    <p>1.3 您理解，本服务的"匿名"特性指技术层面隐去您在微信内的身份标识，这<strong>不能免除</strong>您作为信息内容发布者与创作者应承担的全部法律责任。</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">第二条 发送者的保证与承诺（核心义务）</h3>
                  <p className="text-muted-foreground mb-2">您<strong>单独且不可撤销地保证与承诺</strong>，您利用本服务发送的任何信息内容均符合以下要求，且该保证是本服务为您提供的前提条件：</p>
                  <div className="space-y-2 text-muted-foreground">
                    <p>2.1 <strong>绝对合法合规</strong>：不违反任何现行法律、法规、规章、政策及规范性文件，不涉及任何违反公序良俗的内容。</p>
                    <p>2.2 <strong>尊重他人权利</strong>：不侵犯任何第三方的知识产权、名誉权、隐私权、肖像权、商业秘密等合法权益。</p>
                    <p>2.3 <strong>内容安全</strong>：不包含任何淫秽、色情、赌博、暴力、凶杀、恐怖、歧视性或教唆犯罪的信息，亦非任何未经请求的广告、促销等垃圾信息。</p>
                    <p>2.4 <strong>责任独立承担</strong>：如因您违反上述保证或发送的内容引发任何投诉、索赔、诉讼或导致服务提供方、收件人及任何第三方受损，<strong>您将独立承担所有责任（包括但不限于赔偿金、和解费用、律师费、行政罚款等）</strong>，并确保服务提供方免于遭受任何损害。</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">第三条 服务提供方的角色与免责</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>3.1 服务提供方<strong>仅提供信息存储、传输及发送的技术服务，不对用户生成的内容进行任何事前审查、编辑或修改，也不对内容的合法性、真实性、准确性承担任何责任。</strong></p>
                    <p>3.2 基于独立判断（如收到举报、投诉或行政司法指令），服务提供方<strong>有权立即采取删除、拦截、中断服务等措施</strong>，而无需事先通知且不承担任何责任。</p>
                    <p>3.3 <strong>免责声明</strong>：对于因用户行为、不可抗力、网络状况或任何非服务提供方过错导致的服务中断、数据丢失或任何损失（包括直接或间接），服务提供方在法律允许的最大范围内不承担责任。</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">第四条 协议同意、修改与可追溯性</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>4.1 <strong>您同意过程</strong>：您在前端界面主动勾选"同意"复选框、点击确认发送等操作，即构成您对本协议的<strong>有效电子签名</strong>，具有与书面签名同等的法律效力。</p>
                    <p>4.2 <strong>协议修改</strong>：服务提供方有权更新本协议。更新后，您继续使用服务即视为接受新协议。协议最新版本及生效日期将在小程序内公示。</p>
                    <p>4.3 <strong>可追溯记录</strong>：为履行协议及解决争议，服务提供方将记录本次操作的协议版本号、您的同意状态及时间戳等日志。</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">第五条 其他</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>5.1 本协议的订立、执行、解释及争议解决均适用中华人民共和国大陆地区法律。</p>
                    <p>5.2 因本协议产生的任何争议，双方应友好协商；协商不成的，任何一方均有权将争议提交至<strong>服务提供方所在地有管辖权的人民法院</strong>诉讼解决。</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 mt-6">
                <h3 className="font-semibold mb-3">用户最终确认栏</h3>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                  <li>本人已阅读、理解并完全同意上述《匿名信函服务使用协议》（版本号：V1.0）的全部内容。</li>
                  <li>本人确认，本人将要发送的信函内容符合协议第二条约定的全部保证与承诺。</li>
                  <li>本人理解并接受，若违反协议，本人将独立承担一切法律后果。</li>
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* 底部区域 */}
        <div className="mt-12 pb-4 animate-fade-in" style={{ animationDelay: '800ms' }}>
          {/* 右下角署名 */}
          <div className="flex justify-end">
            <p className="text-muted-foreground text-xs">
              By 子非余
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Email;
