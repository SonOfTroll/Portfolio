'use client'

import GlassCard from './GlassCard'

export default function AwsCertCard() {
    return (
        <GlassCard className="col-span-2 md:col-span-1 flex flex-col justify-center items-center gap-4">
            {/* Glowing AWS Logo */}
            <div className="relative w-16 h-16 bg-white/10 rounded-full flex items-center justify-center shadow-[0_0_30px_#FF990050]">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#FF9900]" fill="currentColor">
                    <path d="M6.763 10.036a4.58 4.58 0 00-.296 1.558c0 .755.223 1.297.667 1.672.444.376 1.04.553 1.77.553.28 0 .574-.029.883-.088a3.71 3.71 0 00.924-.297v-1.738c-.197.13-.42.236-.669.318a2.3 2.3 0 01-.737.123c-.359 0-.635-.1-.828-.3-.194-.199-.29-.495-.29-.886 0-.424.109-.777.328-1.058.218-.281.508-.422.87-.422.242 0 .476.045.703.136.227.09.428.213.604.367v-1.68a3.814 3.814 0 00-.788-.232 4.65 4.65 0 00-.804-.07c-.855 0-1.547.26-2.076.782-.528.523-.793 1.2-.793 2.033l.532-.471zm7.205-2.55L12 13.036l-1.968-5.55H7.96l2.91 7.527h2.26l2.91-7.527h-2.072zm4.74 5.876c-.414 0-.746-.138-.996-.414-.25-.276-.375-.644-.375-1.105 0-.461.124-.832.373-1.114.25-.281.584-.422 1.004-.422.42 0 .752.14 1 .42.246.28.37.653.37 1.116 0 .462-.124.832-.37 1.114-.248.281-.582.421-1.003.421l-.003-.016zm-.01-5.13c-.914 0-1.639.305-2.174.914-.536.61-.803 1.41-.803 2.403 0 .994.271 1.787.813 2.383.541.596 1.27.893 2.186.893.904 0 1.624-.3 2.16-.898.536-.599.803-1.392.803-2.38 0-.998-.27-1.8-.81-2.404-.54-.604-1.264-.907-2.175-.907v-.004z" />
                    <path d="M18.749 15.953c-2.212 1.093-4.86 1.672-7.342 1.672-3.474 0-6.602-1.085-8.968-2.892-.186-.141-.344.087-.19.27 2.554 2.483 5.71 3.973 9.168 3.973 2.683 0 5.791-.937 7.876-2.716.316-.269.03-.673-.344-.434l-.2.127z" />
                    <path d="M19.89 14.69c-.253-.272-1.674-.129-2.313-.065-.194.018-.224-.122-.049-.228 1.133-.67 2.992-.476 3.21-.252.217.228-.06 1.796-1.12 2.545-.163.115-.318.054-.246-.098.238-.502.772-1.627.518-1.902z" />
                </svg>
            </div>

            {/* Title */}
            <div className="text-center">
                <h3 className="text-xl font-bold leading-none">AWS CERTIFIED</h3>
                <p className="text-xs text-white/60 tracking-widest mt-1">CLOUD PRACTITIONER</p>
            </div>

            {/* Validation Link */}
            <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 rounded-full border border-[#FF9900]/30 text-[#FF9900] text-[10px] font-mono tracking-wider hover:bg-[#FF9900] hover:text-black transition-all duration-300"
            >
                VERIFY CREDENTIAL
            </a>
        </GlassCard>
    )
}
