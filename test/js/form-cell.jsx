/**
 * Created by brad.wu on 8/16/2015.
 */
(function () {
    var validator = $pt.createModelValidator({
        text1: {
            required: true
        },
        text2: {
            required: [
                {
                    _phase: ['one', 'two'],
                    rule: true
                }
            ]
        }
    });
    var model = $pt.createModel({check: true}, validator);
    var plainText = $pt.createCellLayout('text', {
        label: function() {return 'Default Cell'},
        comp: {
            view: 'edit'
        },
        pos: {row: 1, col: 1}
    });
    var requiredCell = $pt.createCellLayout('text1', {
        label: 'Default Cell',
        comp: {
            tooltip: $pt.markFuncAsWrap(function() {
                console.log('func executed')
                return 'I\'m a tooltip';
            })
        },
        pos: {row: 1, col: 1}
    });
    var requiredCell2 = $pt.createCellLayout('text2', {
        label: 'Default Cell 2',
        comp: {
            tooltip: 'I\'m a tooltip',
            // paintRequired: 'one',
            required: {
                depends: 'text1',
                when: function() {
                    return this.getModel().get('text1') == 'abc';
                }
            },
            validation: {
                depends: 'text1'
            }
        },
        pos: {row: 1, col: 1},
        validate: 'one'
    });
    var horizontalPlainText = $pt.createCellLayout('text', {
        label: 'Horizontal Direction',
        comp: {
            labelDirection: 'horizontal'
        },
        pos: {row: 1, col: 1}
    });
    var horizontal3PlainText = $pt.createCellLayout('text', {
        label: '3/12 Label',
        comp: {
            labelDirection: 'horizontal',
            labelWidth: 3
        },
        pos: {row: 1, col: 1}
    });
    var noLabel = $pt.createCellLayout('text', {
        label: 'Default Cell',
        comp: {
            type: {type: $pt.ComponentConstants.Text, label: false},
            placeholder: 'No Label'
        },
        pos: {row: 1, col: 1}
    });
    var longLabel = $pt.createCellLayout('text', {
        label: 'I\'m a very long label, which will ellipsis by pre-defined label css',
        pos: {row: 1, col: 1}
    });
    var horizontalLongLabel = $pt.createCellLayout('text', {
        label: 'I\'m a very long label, which will ellipsis by pre-defined label css',
        comp: {
            labelDirection: 'horizontal'
        },
        pos: {row: 1, col: 1}
    });
    var toggle = $pt.createCellLayout('check', {
        label: 'Toggle Test',
        comp: {
            type: $pt.ComponentConstants.Toggle,
            tooltip: 'I\'m a tooltip'
        },
        pos: {row: 1, col: 1}
    });
    var viewText = $pt.createCellLayout('text', {
        label: 'Only In View',
        comp: {
            view: 'view'
        },
        pos: {row: 1, col: 1}
    });

    var panel = (<div>
        <div className='row'>
            <NFormCell model={model} layout={plainText}/>
            <NFormCell model={model} layout={longLabel}/>
            <NFormCell model={model} layout={requiredCell}/>
            <NFormCell model={model} layout={requiredCell2}/>
        </div>
        <div className='row'>
            <NFormCell model={model} layout={horizontalPlainText}/>
            <NFormCell model={model} layout={horizontalLongLabel}/>
            <NFormCell model={model} layout={noLabel}/>
        </div>
        <div className='row'>
            <NFormCell model={model} layout={horizontal3PlainText}/>
        </div>
        <div className='row'>
            <NFormCell model={model} layout={toggle}/>
        </div>
        <div className='row'>
            <NFormCell model={model} layout={plainText} view={true}/>
            <NFormCell model={model} layout={viewText} view={true}/>
            <NFormCell model={model} layout={viewText}/>
        </div>
    </div>);
    ReactDOM.render(panel, document.getElementById('main'));
})();
