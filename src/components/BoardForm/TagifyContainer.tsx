import useBoardForm from '../../hooks/boardHooks/useBoardForm';
import Tags from "@yaireo/tagify/dist/react.tagify"
import "@yaireo/tagify/dist/tagify.css"

const TagifyContainer = ({ handleAddHashtag, useFormProps,initialValue }: ITagsProps) => {
  return (
    <Tags
      settings={{
        whitelist: [],
        maxTags: 5,
        pattern: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|].{0,6}$/,
      }}
      onChange={(e) => {
        handleAddHashtag(e.detail.tagify.getCleanValue());}
      }
      defaultValue={initialValue || []}
      />
  );

}

export default TagifyContainer;

interface ITagsProps {
  initialValue?: string[];
  handleAddHashtag: (hashtag: any) => void;
  useFormProps: ReturnType<typeof useBoardForm>;
}