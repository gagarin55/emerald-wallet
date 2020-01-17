import { Wallet } from '@emeraldpay/emerald-vault-core';
import { addAccount, addresses, screen, State } from '@emeraldwallet/store';
import { Button, IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@material-ui/core';
import {
  AddCircleOutline as AddCircleOutlineIcon,
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  Assignment as AssignmentIcon,
  MoreVert as MoreVertIcon
} from '@material-ui/icons';
import * as React from 'react';
import { connect } from 'react-redux';

interface IOwnProps {
  wallet: Wallet;
}

interface RenderProps {
}

interface DispatchProps {
  showDetails: () => void;
  addAccount: () => void;
}

const WalletMenu = ((props: RenderProps & DispatchProps) => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { showDetails, addAccount } = props;

  return (
    <div>
      <IconButton aria-label='details' onClick={handleClick}>
         <MoreVertIcon />
      </IconButton>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted={true}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={showDetails}>
          <ListItemIcon>
            <AssignmentIcon fontSize='small' />
          </ListItemIcon>
          <Typography variant='inherit'>Wallet Details</Typography>
        </MenuItem>
        <MenuItem onClick={addAccount}>
          <ListItemIcon>
            <AddCircleOutlineIcon fontSize='small' />
          </ListItemIcon>
          <Typography variant='inherit'>Add Coin</Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ArrowDownwardIcon fontSize='small' />
          </ListItemIcon>
          <Typography variant='inherit'>Deposit Into Wallet</Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ArrowUpwardIcon fontSize='small' />
          </ListItemIcon>
          <Typography variant='inherit'>Send From Wallet</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
});

export default connect<RenderProps, DispatchProps, IOwnProps, State>(
  null,
  (dispatch, ownProps) => {
    return {
      showDetails: () => {
        dispatch(screen.actions.gotoScreen('wallet', ownProps.wallet));
      },
      addAccount: () => {
        dispatch(addAccount.actions.start(ownProps.wallet));
        dispatch(screen.actions.gotoScreen('add-account'));
      }
    };
  }
)((WalletMenu));