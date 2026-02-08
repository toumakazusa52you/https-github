// 新春主题音效 Hook
// 使用 Web Audio API 生成简单的音效

class SoundEffects {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
    return this.audioContext;
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  // 按钮点击音效 - 清脆的"叮"声
  playClick() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  }

  // 摇签音效 - 竹签摇晃声
  playShake() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    
    // 创建多个短促的敲击声模拟竹签碰撞
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        // 随机频率模拟不同竹签
        const baseFreq = 2000 + Math.random() * 1000;
        oscillator.frequency.setValueAtTime(baseFreq, ctx.currentTime);
        oscillator.type = 'triangle';

        filter.type = 'highpass';
        filter.frequency.setValueAtTime(1500, ctx.currentTime);

        gainNode.gain.setValueAtTime(0.15 + Math.random() * 0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.05);
      }, i * 80 + Math.random() * 40);
    }
  }

  // 抽中签音效 - 祥和的钟声
  playReveal() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    
    // 主音
    const oscillator1 = ctx.createOscillator();
    const gainNode1 = ctx.createGain();
    oscillator1.connect(gainNode1);
    gainNode1.connect(ctx.destination);
    
    oscillator1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    oscillator1.type = 'sine';
    gainNode1.gain.setValueAtTime(0.4, ctx.currentTime);
    gainNode1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);
    oscillator1.start(ctx.currentTime);
    oscillator1.stop(ctx.currentTime + 1);

    // 和声
    setTimeout(() => {
      const oscillator2 = ctx.createOscillator();
      const gainNode2 = ctx.createGain();
      oscillator2.connect(gainNode2);
      gainNode2.connect(ctx.destination);
      
      oscillator2.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
      oscillator2.type = 'sine';
      gainNode2.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
      oscillator2.start(ctx.currentTime);
      oscillator2.stop(ctx.currentTime + 0.8);
    }, 100);

    // 高音点缀
    setTimeout(() => {
      const oscillator3 = ctx.createOscillator();
      const gainNode3 = ctx.createGain();
      oscillator3.connect(gainNode3);
      gainNode3.connect(ctx.destination);
      
      oscillator3.frequency.setValueAtTime(783.99, ctx.currentTime); // G5
      oscillator3.type = 'sine';
      gainNode3.gain.setValueAtTime(0.25, ctx.currentTime);
      gainNode3.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
      oscillator3.start(ctx.currentTime);
      oscillator3.stop(ctx.currentTime + 0.6);
    }, 200);
  }

  // 成功音效 - 欢快的上升音阶
  playSuccess() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

    notes.forEach((freq, index) => {
      setTimeout(() => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(freq, ctx.currentTime);
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.25, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.2);
      }, index * 100);
    });
  }

  // 红包音效 - 金币叮当声
  playCoin() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(2500, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.1);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);

    // 第二个叮声
    setTimeout(() => {
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc2.frequency.setValueAtTime(3000, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(2200, ctx.currentTime + 0.08);
      osc2.type = 'sine';

      gain2.gain.setValueAtTime(0.15, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

      osc2.start(ctx.currentTime);
      osc2.stop(ctx.currentTime + 0.25);
    }, 80);
  }

  // 删除音效 - 轻柔的消失声
  playDelete() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(400, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.15);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.15);
  }

  // 导航音效 - 轻柔的过渡声
  playNavigate() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(600, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.08);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.12);
  }
}

// 单例实例
export const soundEffects = new SoundEffects();

// React Hook
export function useSoundEffects() {
  return soundEffects;
}
