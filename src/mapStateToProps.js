const mapStateToProps = (state, ownProps) => {
    return {
        attached: true, // debug
        ...state,
        ...ownProps,
        Styles: {...state.Styles},
    }
}

export default mapStateToProps