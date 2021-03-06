
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  chipCellStyles: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  }
}));
