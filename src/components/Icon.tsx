import {
  ArrowRight,
  Award,
  BookOpen,
  BrainCircuit,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Factory,
  GraduationCap,
  Handshake,
  Landmark,
  Layers,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  UserRound,
  X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  ArrowRight,
  Award,
  BookOpen,
  BrainCircuit,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Factory,
  GraduationCap,
  Handshake,
  Landmark,
  Layers,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  UserRound,
  X
};

type IconProps = {
  name: string;
  className?: string;
  strokeWidth?: number;
};

export function Icon({ name, className, strokeWidth = 1.8 }: IconProps) {
  const Lucide = icons[name] || Briefcase;
  return <Lucide aria-hidden="true" className={className} strokeWidth={strokeWidth} />;
}
