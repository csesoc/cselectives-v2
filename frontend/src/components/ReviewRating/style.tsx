import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import styled from 'styled-components';

// make icon component
export const StarIcon = styled(StarRoundedIcon)`
    color: #CED9DD;
    cursor: pointer;
    &:hover {
        color: #FFE380;
    }
`;

export const CircleIcon = styled(CircleRoundedIcon)`
    color: #CED9DD;
    margin-right: 0.5rem;
    cursor: pointer;
    &:hover {
        color: #478EF9;
    }
`;

