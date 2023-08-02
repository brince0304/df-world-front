import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { TagChip } from "components/Chips/TagChip/TagChip";

const BoardTagChips = ({tags, boardType}: IBoardTagChipsProps) => {
    return (
        <Container>
          {tags.map((tag, index) => (
            <TagChip key={index} boardType={boardType} tag={tag} />
          )) }
        </Container>
    )
}

export default BoardTagChips

interface IBoardTagChipsProps {
    tags: string[];
    boardType: string;

}

const Container = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
`;