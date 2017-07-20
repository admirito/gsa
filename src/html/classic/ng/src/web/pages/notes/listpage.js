/* Greenbone Security Assistant
 *
 * Authors:
 * Björn Ricks <bjoern.ricks@greenbone.net>
 *
 * Copyright:
 * Copyright (C) 2017 Greenbone Networks GmbH
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 */

import React from 'react';

import  _ from 'gmp/locale.js';

import IconDivider from '../../components/layout/icondivider.js';

import PropTypes from '../../utils/proptypes.js';

import EntitiesPage from '../../entities/page.js';
import {withEntitiesContainer} from '../../entities/container.js';

import {withDashboard} from '../../components/dashboard/dashboard.js';

import HelpIcon from '../../components/icon/helpicon.js';
import NewIcon from '../../components/icon/newicon.js';

import NotesCharts from './charts.js';
import FilterDialog from './filterdialog.js';
import NotesTable from './table.js';
import withNoteComponent from './withNoteComponent.js';

import {NOTES_FILTER_FILTER} from 'gmp/models/filter.js';

const Dashboard = withDashboard(NotesCharts, {
  hideFilterSelect: true,
  configPrefId: 'ce7b121-c609-47b0-ab57-fd020a0336f4',
  defaultControllersString: 'note-by-active-days|note-by-created|' +
    'note-by-text-words',
  defaultControllerString: 'note-by-active-days',
});

const ToolBarIcons = ({onNoteCreateClick}, {capabilities}) => {
  return (
    <IconDivider>
      <HelpIcon
        page="notes"
        title={_('Help: Notes')}/>
      {capabilities.mayCreate('note') &&
        <NewIcon title={_('New Note')}
          onClick={onNoteCreateClick}/>
      }
    </IconDivider>
  );
};

ToolBarIcons.contextTypes = {
  capabilities: PropTypes.capabilities.isRequired,
};

ToolBarIcons.propTypes = {
  onNoteCreateClick: PropTypes.func,
};

const Page = withNoteComponent({
  onCreated: 'onChanged',
  onCloned: 'onChanged',
  onSaved: 'onChanged',
  onDeleted: 'onChanged',
})(EntitiesPage);

export default withEntitiesContainer(Page, 'note', {
  dashboard: Dashboard,
  extraLoadParams: {details: 1},
  filterEditDialog: FilterDialog,
  filtersFilter: NOTES_FILTER_FILTER,
  sectionIcon: 'note.svg',
  table: NotesTable,
  title: _('Notes'),
  toolBarIcons: ToolBarIcons,
});

// vim: set ts=2 sw=2 tw=80:
