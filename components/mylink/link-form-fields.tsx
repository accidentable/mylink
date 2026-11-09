"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LinkErrors } from "@/lib/link-store";

type Props = {
  idPrefix: string;
  title: string;
  url: string;
  description: string;
  errors: LinkErrors;
  onChange: (field: "title" | "url" | "description", value: string) => void;
};

// 추가 폼과 수정 폼이 같이 쓰는 입력칸 세 개.
export function LinkFormFields({ idPrefix, title, url, description, errors, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor={`${idPrefix}-title`}>제목</Label>
        <Input
          id={`${idPrefix}-title`}
          value={title}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="예: 인스타그램"
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? `${idPrefix}-title-error` : undefined}
          className="h-11"
        />
        {errors.title && (
          <p id={`${idPrefix}-title-error`} className="text-sm text-destructive">
            {errors.title}
          </p>
        )}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor={`${idPrefix}-url`}>주소</Label>
        <Input
          id={`${idPrefix}-url`}
          inputMode="url"
          value={url}
          onChange={(e) => onChange("url", e.target.value)}
          placeholder="예: instagram.com/내아이디"
          aria-invalid={!!errors.url}
          aria-describedby={errors.url ? `${idPrefix}-url-error` : undefined}
          className="h-11"
        />
        {errors.url && (
          <p id={`${idPrefix}-url-error`} className="text-sm text-destructive">
            {errors.url}
          </p>
        )}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor={`${idPrefix}-desc`}>
          설명 <span className="font-normal text-muted-foreground">(선택)</span>
        </Label>
        <Input
          id={`${idPrefix}-desc`}
          value={description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="링크 아래에 작게 보일 한 줄"
          className="h-11"
        />
      </div>
    </div>
  );
}
