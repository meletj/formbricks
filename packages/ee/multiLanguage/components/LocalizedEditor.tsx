import * as DOMPurify from "dompurify";
import type { Dispatch, SetStateAction } from "react";

import { md } from "@formbricks/lib/markdownIt";
import { recallToHeadline } from "@formbricks/lib/utils/recall";
import { TI18nString, TSurvey } from "@formbricks/types/surveys";
import { Editor } from "@formbricks/ui/Editor";

import { extractLanguageSymbols, isLabelValidForAllLanguages } from "../utils/i18n";
import { LanguageIndicator } from "./LanguageIndicator";

interface LocalizedEditorProps {
  id: string;
  value: TI18nString;
  localSurvey: TSurvey;
  isInvalid: boolean;
  updateQuestion: any;
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  questionIdx: number;
  languages: string[][];
  firstRender: boolean;
  setFirstRender?: Dispatch<SetStateAction<boolean>>;
}
export const LocalizedEditor = ({
  id,
  value,
  localSurvey,
  isInvalid,
  updateQuestion,
  selectedLanguage,
  setSelectedLanguage,
  questionIdx,
  languages,
  firstRender,
  setFirstRender,
}: LocalizedEditorProps) => {
  const hasi18n = value._i18n_;
  const isInComplete =
    id === "subheader"
      ? value.en.trim() !== "" &&
        isInvalid &&
        !isLabelValidForAllLanguages(value, extractLanguageSymbols(languages)) &&
        selectedLanguage === "en"
      : isInvalid &&
        !isLabelValidForAllLanguages(value, extractLanguageSymbols(languages)) &&
        selectedLanguage === "en";
  return (
    <div className="relative w-full">
      <Editor
        key={`${questionIdx}-${selectedLanguage}`}
        getText={() => md.render(value[selectedLanguage] ?? "")}
        setText={(v: string) => {
          let translatedHtml = {
            ...(value as TI18nString),
            [selectedLanguage]: v,
          };
          if (questionIdx === -1) {
            // welcome card
            updateQuestion({ html: value });
            return;
          }
          updateQuestion(questionIdx, { html: translatedHtml });
        }}
        excludedToolbarItems={["blockType"]}
        disableLists
        firstRender={firstRender}
        setFirstRender={setFirstRender}
      />
      {hasi18n && languages?.length > 1 && (
        <div>
          <LanguageIndicator
            selectedLanguage={selectedLanguage}
            languages={languages}
            setSelectedLanguage={setSelectedLanguage}
          />

          {selectedLanguage !== "en" && value.en && (
            <div className="mt-1 flex text-xs text-gray-500">
              <strong>Translate:</strong>
              <label
                className="fb-htmlbody ml-1" // styles are in global.css
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(recallToHeadline(value, localSurvey, false, "en")["en"]),
                }}></label>
            </div>
          )}
        </div>
      )}

      {isInComplete && <div className="mt-1 text-xs text-red-400">Contains Incomplete translations</div>}
    </div>
  );
};