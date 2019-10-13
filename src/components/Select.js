import React, { PureComponent } from 'react';
import SelectField from 'react-md/lib/SelectFields';

export class Select extends PureComponent {
  render() {
      let props = this.props

    return (
        <section className="md-grid">
        <SelectField
          onChange={props.onChange}
          id={Math.random().toString()}
          label={props.label}
          disabled={props.disabled}
          placeholder={props.placeholder}
          menuItems={props.menuItems}
          itemLabel={props.itemLabel}
          itemValue={props.itemValue}
          className="md-cell"
        />
        </section>
    );
  }
}