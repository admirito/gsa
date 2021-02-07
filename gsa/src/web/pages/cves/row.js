/* Copyright (C) 2017-2020 Greenbone Networks GmbH
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License
 * as published by the Free Software Foundation, either version 3
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';

import {shorten} from 'gmp/utils/string';

import SeverityBar from 'web/components/bar/severitybar';

import Comment from 'web/components/comment/comment';

import DateTime from 'web/components/date/datetime';

import TableBody from 'web/components/table/body';
import TableRow from 'web/components/table/row';
import TableData from 'web/components/table/data';

import EntitiesActions from 'web/entities/actions';
import {RowDetailsToggle} from 'web/entities/row';

import PropTypes from 'web/utils/proptypes';
import {na} from 'web/utils/render';

const Row = ({
  actionsComponent: ActionsComponent = EntitiesActions,
  entity,
  links = true,
  onToggleDetailsClick,
  ...props
}) => (
  <TableBody>
    <TableRow>
      <TableData rowSpan="2">
        <span>
          <RowDetailsToggle name={entity.id} onClick={onToggleDetailsClick}>
            {entity.name}
          </RowDetailsToggle>
        </span>
        <Comment text={entity.comment} />
      </TableData>
      <TableData>{na(entity.cvssAccessVector)}</TableData>
      <TableData>{na(entity.cvssAccessComplexity)}</TableData>
      <TableData>{na(entity.cvssAuthentication)}</TableData>
      <TableData>{na(entity.cvssConfidentialityImpact)}</TableData>
      <TableData>{na(entity.cvssIntegrityImpact)}</TableData>
      <TableData>{na(entity.cvssAvailabilityImpact)}</TableData>
      <TableData>
        <DateTime date={entity.creationTime} />
      </TableData>
      <TableData>
        <SeverityBar severity={entity.severity} />
      </TableData>
      <ActionsComponent {...props} entity={entity} />
    </TableRow>
    <TableRow>
      <TableData colSpan="9">{shorten(entity.description, 250)}</TableData>
    </TableRow>
  </TableBody>
);

Row.propTypes = {
  actionsComponent: PropTypes.component,
  entity: PropTypes.model,
  links: PropTypes.bool,
  onToggleDetailsClick: PropTypes.func.isRequired,
};

export default Row;

// vim: set ts=2 sw=2 tw=80:
