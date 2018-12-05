/* Copyright (C) 2018 Greenbone Networks GmbH
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
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

import {render, fireEvent} from 'web/utils/testing';

import Field from '../field';
import Theme from 'web/utils/theme';


describe('Field tests', () => {

  test('should render', () => {
    const {element} = render(<Field/>);
    expect(element).toMatchSnapshot();

    expect(element).not.toHaveStyleRule('cursor');
    expect(element).not.toHaveStyleRule('opacity');
    expect(element).toHaveStyleRule('background-color', Theme.white);
  });

  test('should render in disabled state', () => {
    const {element} = render(<Field disabled={true}/>);

    expect(element).toHaveStyleRule('cursor', 'not-allowed');
    expect(element).toHaveStyleRule('opacity', '1');
    expect(element).toHaveStyleRule('background-color', Theme.dialogGray);
  });

  test('should call change handler with value', () => {
    const onChange = jest.fn();

    const {element} = render(
      <Field
        value="foo"
        onChange={onChange}
      />
     );

     fireEvent.change(element, {target: {value: 'bar'}});

     expect(onChange).toHaveBeenCalledWith('bar', undefined);
  });

  test('should call change handler with value and name', () => {
    const onChange = jest.fn();

    const {element} = render(
      <Field
        name="foo"
        value="ipsum"
        onChange={onChange}
      />
     );

     fireEvent.change(element, {target: {value: 'bar'}});

     expect(onChange).toHaveBeenCalledWith('bar', 'foo');
  });

});

// vim: set ts=2 sw=2 tw=80:
