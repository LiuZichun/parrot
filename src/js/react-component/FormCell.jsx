/**
 * Created by brad.wu on 8/18/2015.
 * depends cell components which will be renderred in cell.
 *
 * the following settings are shared with all form cell components
 * layout: {
 *      dataId: string,
 *      comp: {
 *          paintRequired: boolean,
 *          labelDirection: string,
 *          labelWidth: number
 *      },
 *      css: {
 *          cell: string,
 *          label: string
 *      }
 * }
 */
(function (context, $, $pt) {
	var NFormCell = React.createClass($pt.defineCellComponent({
		statics: {
			REQUIRED_ICON: 'asterisk',
			TOOLTIP_ICON: 'question-circle',
			LABEL_WIDTH: 4,
			__componentRenderer: {},
			registerComponentRenderer: function (type, func) {
				NFormCell.__componentRenderer[type] = func;
			},
			getComponentRenderer: function (type) {
				if (NFormCell.__componentRenderer[type] == null) {
					if (NFormCell['__' + type] != null) {
						NFormCell.registerComponentRenderer(type, NFormCell['__' + type]);
						return NFormCell.getComponentRenderer(type);
					} else {
						throw $pt.createComponentException($pt.ComponentConstants.Err_Unsupported_Component,
							"Component type[" + type + "] is not supported yet.");
					}
				} else {
					return NFormCell.__componentRenderer[type];
				}
			},
			transformParameters: function(model, layout, direction, viewMode) {
				return {
					model: model,
					layout: layout,
					direction: direction,
					view: viewMode,
					ref: layout.getId()
				};
			},
			/**
			 * render label
			 * @returns {XML}
			 * @private
			 */
			__label: function (model, layout, direction, viewMode) {
				return <NLabel {...NFormCell.transformParameters(model, layout, direction, viewMode)}/>;
			},
			/**
			 * render text input
			 * @returns {XML}
			 * @private
			 */
			__text: function (model, layout, direction, viewMode) {
				return <NText {...NFormCell.transformParameters(model, layout, direction, viewMode)}/>;
			},
			/**
			 * render text area
			 * @returns {XML}
			 * @private
			 */
			__textarea: function (model, layout, direction, viewMode) {
				return <NTextArea {...NFormCell.transformParameters(model, layout, direction, viewMode)}/>;
			},
			/**
			 * render checkbox
			 * @returns {XML}
			 * @private
			 */
			__check: function (model, layout, direction, viewMode) {
				return <NCheck {...NFormCell.transformParameters(model, layout, direction, viewMode)}/>;
			},
			/**
			 * render checkbox array
			 * @returns {XML}
			 * @private
			 */
			__acheck: function(model, layout, direction, viewMode) {
				return <NArrayCheck {...NFormCell.transformParameters(model, layout, direction, viewMode)} />;
			},
			/**
			 * render toggle button
			 * @returns {XML}
			 * @private
			 */
			__toggle: function (model, layout, direction, viewMode) {
				return <NToggle {...NFormCell.transformParameters(model, layout, direction, viewMode)}/>;
			},
			/**
			 * render radio
			 * @returns {XML}
			 * @private
			 */
			__radio: function (model, layout, direction, viewMode) {
				return <NRadio {...NFormCell.transformParameters(model, layout, direction, viewMode)}/>;
			},
			/**
			 * render datetime picker
			 * @returns {XML}
			 * @private
			 */
			__date: function (model, layout, direction, viewMode) {
				return <NDateTime {...NFormCell.transformParameters(model, layout, direction, viewMode)}/>;
			},
			/**
			 * render select
			 * @returns {XML}
			 * @private
			 */
			__select: function (model, layout, direction, viewMode) {
				return <NSelect {...NFormCell.transformParameters(model, layout, direction, viewMode)}/>;
			},
			/**
			 * render search text
			 * @returns {XML}
			 * @private
			 */
			__search: function (model, layout, direction, viewMode) {
				return <NSearchText {...NFormCell.transformParameters(model, layout, direction, viewMode)}/>;
			},
			/**
			 * render table
			 * @returns {XML}
			 * @private
			 */
			__table: function (model, layout, direction, viewMode) {
				return <NTable {...NFormCell.transformParameters(model, layout, direction, viewMode)}/>;
			},
			/**
			 * render tree
			 * @returns {XML}
			 * @private
			 */
			__tree: function (model, layout, direction, viewMode) {
				return <NTree {...NFormCell.transformParameters(model, layout, direction, viewMode)}/>;
			},
			/**
			 * render select tree
			 * @returns {XML}
			 * @private
			 */
			__seltree: function(model, layout, direction, viewMode) {
				return <NSelectTree {...NFormCell.transformParameters(model, layout, direction, viewMode)} />;
			},
			/**
			 * render file
			 * @return {XML}
			 * @private
			 */
			__file: function (model, layout, direction, viewMode) {
				return <NFile {...NFormCell.transformParameters(model, layout, direction, viewMode)}/>;
			},
			/**
			 * render button
			 * @returns {XML}
			 * @private
			 */
			__button: function (model, layout, direction, viewMode) {
				return <NFormButton {...NFormCell.transformParameters(model, layout, direction, viewMode)}/>;
			},
			/**
			 * render tab
			 * @returns {XML}
			 * @private
			 */
			__tab: function (model, layout, direction, viewMode) {
				return <NFormTab {...NFormCell.transformParameters(model, layout, direction, viewMode)}/>;
			},
			/**
			 * render array tab
			 * @returns {XML}
			 * @private
			 */
			__atab: function (model, layout, direction, viewMode) {
				return <NArrayTab {...NFormCell.transformParameters(model, layout, direction, viewMode)}/>;
			},
			/**
			 * render panel
			 * @returns {XML}
			 * @private
			 */
			__panel: function (model, layout, direction, viewMode) {
				return <NPanel {...NFormCell.transformParameters(model, layout, direction, viewMode)}/>;
			},
			/**
			 * render array panel
			 * @returns {XML}
			 * @private
			 */
			__apanel: function (model, layout, direction, viewMode) {
				return <NArrayPanel {...NFormCell.transformParameters(model, layout, direction, viewMode)}/>;
			},
			/**
			 * render form
			 * @returns {XML}
			 * @private
			 */
			__form: function (model, layout, direction, viewMode) {
				var formLayout = $pt.createFormLayout(layout.getComponentOption('editLayout'));
				return <NForm {...NFormCell.transformParameters(model, formLayout, direction, viewMode)}/>;
			},
			/**
			 * render button footer
			 * @returns {XML}
			 * @private
			 */
			__buttonfooter: function (model, layout, direction, viewMode) {
				return <NFormButtonFooter {...NFormCell.transformParameters(model, layout, direction, viewMode)}/>;
			},
			/**
			 * render nothing
			 * @returns {null}
			 * @private
			 */
			__nothing: function () {
				return null;
			}
		},
		propTypes: {
			// model, whole model, not only for this cell
			// use id to get the value of this cell from model
			model: React.PropTypes.object,
			// CellLayout
			layout: React.PropTypes.object,
			// label direction
			direction: React.PropTypes.oneOf(['vertical', 'horizontal']),
			// is view mode or not
			view: React.PropTypes.bool
		},
		getDefaultProps: function () {
			return {
				defaultOptions: {
					paintRequired: true
				},
				direction: 'vertical'
			};
		},
		/**
		 * will update
		 * @param nextProps
		 */
		componentWillUpdate: function (nextProps) {
			this.destroyPopover();
			this.removePostChangeListener(this.onModelChanged);
			this.removePostValidateListener(this.onModelValidateChanged);
			this.removeVisibleDependencyMonitor();
			this.removeEnableDependencyMonitor();
			this.unregisterFromComponentCentral();
		},
		/**
		 * did update
		 * @param prevProps
		 * @param prevState
		 */
		componentDidUpdate: function (prevProps, prevState) {
			this.renderPopover();
			this.addPostChangeListener(this.onModelChanged);
			this.addPostValidateListener(this.onModelValidateChanged);
			this.addVisibleDependencyMonitor();
			this.addEnableDependencyMonitor();
			this.registerToComponentCentral();
		},
		/**
		 * did mount
		 */
		componentDidMount: function () {
			this.renderPopover();
			this.addPostChangeListener(this.onModelChanged);
			this.addPostValidateListener(this.onModelValidateChanged);
			this.addVisibleDependencyMonitor();
			this.addEnableDependencyMonitor();
			this.registerToComponentCentral();
		},
		/**
		 * will unmount
		 */
		componentWillUnmount: function () {
			this.destroyPopover();
			this.removePostChangeListener(this.onModelChanged);
			this.removePostValidateListener(this.onModelValidateChanged);
			this.removeVisibleDependencyMonitor();
			this.removeEnableDependencyMonitor();
			this.unregisterFromComponentCentral();
		},
		destroyPopover: function () {
			var comp = this.refs.comp;
			if (comp != null) {
				$(React.findDOMNode(comp)).popover("destroy");
			}
		},
		/**
		 * render error popover
		 */
		renderPopover: function () {
			if (this.getLayout().getComponentType().popover !== false && this.getModel().hasError(this.getDataId())) {
				var messages = this.getModel().getError(this.getDataId());
				var _this = this;
				var popover = {
					placement: 'top',
					trigger: 'hover',
					html: true,
					content: messages.map(function (msg) {
						return "<span style='display:block'>" + msg.format([_this.getLayout().getLabel()]) + "</span>";
					}),
					// false is very import, since when destroy popover,
					// the really destroy will be invoked by some delay,
					// and before really destory invoked,
					// the new popover is bind by componentDidUpdate method.
					// and finally new popover will be destroyed.
					animation: false
				};

				var comp = this.refs.comp;
				if (comp != null) {
					$(React.findDOMNode(comp)).popover(popover);
				}
			}
		},
		/**
		 * render input component
		 * @param componentDefinition
		 */
		renderInputComponent: function (componentDefinition) {
			// always pass form model to component,
			// since maybe getModel() returns inner model which defined with comp: {model: another}
			var direction = this.props.direction ? this.props.direction : 'vertical';
			if (componentDefinition.render) {
				// user defined component
				return componentDefinition.render.call(this, this.getFormModel(), this.getLayout(), direction, this.isViewMode());
			}

			// pre-defined components
			var type = componentDefinition.type;
			if (!type) {
				type = "text";
			}
			return (<div ref="comp">
				{NFormCell.getComponentRenderer(type).call(this, this.getFormModel(), this.getLayout(), direction, this.isViewMode())}
			</div>);
		},
		/**
		 * render label
		 * @returns {XML}
		 */
		renderLabel: function () {
			var requiredPaint = this.getComponentOption("paintRequired");
			var requireIconCSS = {
				fa: true,
				'fa-fw': true,
				required: true
			};
			requireIconCSS['fa-' + NFormCell.REQUIRED_ICON] = true;
			var requiredLabel = requiredPaint && this.getModel().isRequired(this.getDataId()) ?
				(<span className={$pt.LayoutHelper.classSet(requireIconCSS)}/>) : null;
			//var showColon = !this.getLayout().getLabel().endsWith('?')
			//{showColon ? ':' : null}
			var tooltip = this.getComponentOption('tooltip');
			var tooltipIcon = null;
			if (tooltip != null && !tooltip.isBlank()) {
				var tooltipCSS = {
					fa: true,
					'fa-fw': true,
					'n-form-cell-tooltip': true
				};
				tooltipCSS['fa-' + NFormCell.TOOLTIP_ICON] = true;
				tooltipIcon = <span className={$pt.LayoutHelper.classSet(tooltipCSS)} title={tooltip}/>;
			}
			return (<span className={this.getLayout().getLabelCSS()} onClick={this.onLabelClicked} ref="label">
			{this.getLayout().getLabel()}
				{tooltipIcon}
				{requiredLabel}
		</span>);
		},
		/**
		 * render
		 * @returns {XML}
		 */
		render: function () {
			if (!this.isVisible()) {
				return (<div className={this.getCSSClassName() + ' n-form-cell-invisible'}/>);
			} else {
				var css = this.getCSSClassName();
				if (this.getModel().hasError(this.getDataId())) {
					css += " has-error";
				}
				if (!this.isEnabled()) {
					css += ' n-form-cell-disabled';
				}
				// read component definition
				var type = this.getLayout().getComponentType();
				if (type.label === false) {
					return (<div className={css} ref='div'>
						{this.renderInputComponent(type)}
					</div>);
				} else {
					var labelDirection = this.getComponentOption("labelDirection");
					if (labelDirection == null) {
						labelDirection = this.props.direction ? this.props.direction : 'vertical';
					}
					if (labelDirection != 'vertical') {
						return (<div className={css + ' horizontal-label'} ref='div'>
							<div className='row'>
								<div className={this.getHorizontalLabelCSS()}>
									{this.renderLabel()}
								</div>
								<div className={this.getHorizontalComponentCSS()}>
									{this.renderInputComponent(type)}
								</div>
							</div>
						</div>);
					} else {
						return (<div className={css + ' vertical-label'} ref='div'>
							{this.renderLabel()}
							{this.renderInputComponent(type)}
						</div>);
					}
				}
			}
		},
		/**
		 * on model change
		 * @param evt
		 */
		onModelChanged: function (evt) {
			this.getModel().validate(evt.id);
		},
		/**
		 * on model validate change
		 * @param evt not used
		 */
		onModelValidateChanged: function (evt) {
			// TODO maybe will introduce performance issue, cannot sure now.
			// this.forceUpdate();
			var div;
			if (this.getModel().hasError(this.getDataId())) {
				this.renderPopover();
				div = this.refs.div;
				if (div != null) {
					$(React.findDOMNode(div)).addClass('has-error');
				}
			} else {
				this.destroyPopover();
				div = this.refs.div;
				if (div != null) {
					$(React.findDOMNode(div)).removeClass('has-error');
				}
			}
		},
		/**
		 * on label clicked
		 */
		onLabelClicked: function () {
			$(React.findDOMNode(this.refs.comp)).focus();
		},
		/**
		 * get css class
		 * @returns {string}
		 */
		getCSSClassName: function () {
			var width = this.getLayout().getWidth();
			var css = {
				'n-form-cell': true
			};
			if (typeof width === 'number') {
				css['col-sm-' + width] = true;
				css['col-md-' + width] = true;
				css['col-lg-' + width] = true;
			} else {
				css['col-sm-' + (width.sm ? width.sm : width.width)] = true;
				css['col-md-' + (width.md ? width.md : width.width)] = true;
				css['col-lg-' + (width.lg ? width.lg : width.width)] = true;
			}
			return this.getLayout().getCellCSS($pt.LayoutHelper.classSet(css));
		},
		/**
		 * get label css when horizontal direction
		 * @returns {string}
		 */
		getHorizontalLabelCSS: function () {
			var width = this.getHorizontalLabelWidth();
			return "col-sm-" + width + " col-md-" + width + " col-lg-" + width;
		},
		/**
		 * get component css when horizontal direction
		 * @returns {string}
		 */
		getHorizontalComponentCSS: function () {
			var width = 12 - this.getHorizontalLabelWidth();
			return "col-sm-" + width + " col-md-" + width + " col-lg-" + width;
		},
		getHorizontalLabelWidth: function () {
			var width = this.getComponentOption('labelWidth');
			return width ? width : NFormCell.LABEL_WIDTH;
		},
		/**
		 * register to component central
		 */
		registerToComponentCentral: function() {
			var id = this.getComponentCentralId();
			if (id) {
				$pt.LayoutHelper.registerComponent(id + '@cell', this);
			}
		},
		/**
		 * unregsiter from component central
		 */
		unregisterFromComponentCentral: function() {
			var id = this.getComponentCentralId();
			if (id) {
				$pt.LayoutHelper.unregisterComponent(id + '@cell', this);
			}
		}
	}));
	context.NFormCell = NFormCell;
}(this, jQuery, $pt));
