(function(React2, react) {
  "use strict";
  const hubspot = {
    extend: render
  };
  const extend = (...args) => self.extend(...args);
  function render(renderCallback) {
    return extend((root, api) => {
      const renderCallbackResult = renderCallback(api);
      if (!React2.isValidElement(renderCallbackResult)) {
        throw new Error(`[hubspot.extend]: Expected callback function to return a valid element, got: ${renderCallbackResult}`);
      }
      react.createRoot(root).render(renderCallbackResult);
      root.mount();
    });
  }
  const Alert = react.createRemoteReactComponent("Alert");
  const Button = react.createRemoteReactComponent("Button");
  react.createRemoteReactComponent("ButtonRow");
  react.createRemoteReactComponent("Card");
  react.createRemoteReactComponent("DescriptionList");
  react.createRemoteReactComponent("DescriptionListItem");
  react.createRemoteReactComponent("Divider");
  react.createRemoteReactComponent("EmptyState");
  react.createRemoteReactComponent("ErrorState");
  const Form = react.createRemoteReactComponent("Form");
  const Heading = react.createRemoteReactComponent("Heading");
  react.createRemoteReactComponent("Image");
  react.createRemoteReactComponent("Input");
  react.createRemoteReactComponent("Link");
  react.createRemoteReactComponent("TextArea");
  react.createRemoteReactComponent("Textarea");
  react.createRemoteReactComponent("LoadingSpinner");
  react.createRemoteReactComponent("ProgressBar");
  const Select = react.createRemoteReactComponent("Select");
  react.createRemoteReactComponent("Tag");
  react.createRemoteReactComponent("Text");
  react.createRemoteReactComponent("Tile");
  react.createRemoteReactComponent("Stack");
  react.createRemoteReactComponent("ToggleGroup");
  react.createRemoteReactComponent("StatisticsItem");
  react.createRemoteReactComponent("Statistics");
  react.createRemoteReactComponent("StatisticsTrend");
  react.createRemoteReactComponent("Table");
  react.createRemoteReactComponent("TableFooter");
  react.createRemoteReactComponent("TableCell");
  react.createRemoteReactComponent("TableRow");
  react.createRemoteReactComponent("TableBody");
  react.createRemoteReactComponent("TableHeader");
  react.createRemoteReactComponent("TableHead");
  react.createRemoteReactComponent("NumberInput");
  react.createRemoteReactComponent("Box");
  react.createRemoteReactComponent("StepIndicator");
  const Accordion = react.createRemoteReactComponent("Accordion");
  react.createRemoteReactComponent("MultiSelect");
  const Flex = react.createRemoteReactComponent("Flex");
  var ServerlessExecutionStatus;
  (function(ServerlessExecutionStatus2) {
    ServerlessExecutionStatus2["Success"] = "SUCCESS";
    ServerlessExecutionStatus2["Error"] = "ERROR";
  })(ServerlessExecutionStatus || (ServerlessExecutionStatus = {}));
  function createExtensionComponent(componentType) {
    return react.createRemoteReactComponent(componentType);
  }
  createExtensionComponent("CrmObjectProperty");
  createExtensionComponent("CrmPropertyList");
  createExtensionComponent("CrmAssociationTable");
  createExtensionComponent("CrmDataHighlight");
  createExtensionComponent("CrmReport");
  const CrmAssociationPivot = createExtensionComponent("CrmAssociationPivot");
  createExtensionComponent("CrmAssociationPropertyList");
  const CrmStageTracker = createExtensionComponent("CrmStageTracker");
  hubspot.extend(({ context, actions, runServerlessFunction }) => /* @__PURE__ */ React2.createElement(
    Extension,
    {
      context,
      runServerless: runServerlessFunction,
      fetchCrmObjectProperties: actions.fetchCrmObjectProperties,
      addAlert: actions.addAlert
    }
  ));
  const Extension = ({
    context,
    runServerless,
    fetchCrmObjectProperties,
    addAlert
  }) => {
    const [stage, setStage] = React2.useState(null);
    const [showProperties, setShowProperties] = React2.useState(true);
    const [dealId, setDealId] = React2.useState(null);
    const [dealname, setDealname] = React2.useState(null);
    const [error, setError] = React2.useState("");
    const stageToPropertiesMap = {
      appointmentscheduled: [
        "dealname",
        "engagements_last_meeting_booked",
        "dealtype"
      ],
      qualifiedtobuy: ["hubspot_owner_id", "amount", "dealtype", "hs_priority"],
      presentationscheduled: [
        "hs_priority",
        "hs_deal_stage_probability",
        "hs_forecast_amount"
      ],
      decisionmakerboughtin: [
        "hs_deal_stage_probability",
        "hs_tcv",
        "amount",
        "notes_last_contacted"
      ],
      contractsent: ["createdate", "hs_acv", "hs_deal_stage_probability"],
      closedwon: ["closed_won_reason", "closedate", "amount"],
      closedlost: ["closedate", "closed_lost_reason", "amount"]
    };
    const options = [
      { label: "Appointment Scheduled", value: "appointmentscheduled" },
      { label: "Qualified to Buy", value: "qualifiedtobuy" },
      { label: "Presentation Scheduled", value: "presentationscheduled" },
      { label: "Decision Maker Bought In", value: "decisionmakerboughtin" },
      { label: "Contract Sent", value: "contractsent" },
      { label: "Closed Won", value: "closedwon" },
      { label: "Closed Lost", value: "closedlost" }
    ];
    React2.useEffect(() => {
      fetchCrmObjectProperties(["dealname", "dealstage", "hs_object_id"]).then(
        (properties) => {
          setStage(properties.dealstage);
          setDealId(properties.hs_object_id);
          setDealname(properties.dealname);
        }
      );
    }, [stage]);
    const handleStageChange = React2.useCallback(
      (newStage) => {
        runServerless({
          name: "updateDeal",
          parameters: {
            dealId,
            dealStage: newStage
          }
        }).then((resp) => {
          if (resp.status === "SUCCESS") {
            addAlert({
              type: "success",
              message: "Deal stage updated successfully"
            });
            setStage(newStage);
          } else {
            setError(resp.message || "An error occurred");
          }
        });
      },
      [dealId, addAlert, runServerless]
    );
    const handlePropertyToggle = React2.useCallback(() => {
      setShowProperties((current) => !current);
    }, []);
    if (error !== "") {
      return /* @__PURE__ */ React2.createElement(Alert, { title: "Error" }, error);
    }
    return /* @__PURE__ */ React2.createElement(Flex, { direction: "column", justify: "start", gap: "medium" }, /* @__PURE__ */ React2.createElement(Heading, null, "Deal status : ", dealname), /* @__PURE__ */ React2.createElement(Flex, { direction: "row", justify: "start", align: "end", gap: "medium" }, /* @__PURE__ */ React2.createElement(Form, null, /* @__PURE__ */ React2.createElement(
      Select,
      {
        label: "Update Deal Stage",
        name: "deal-stage",
        tooltip: "Please choose",
        value: stage,
        onChange: handleStageChange,
        options
      }
    )), /* @__PURE__ */ React2.createElement(
      Button,
      {
        variant: showProperties ? "primary" : "secondary",
        onClick: handlePropertyToggle
      },
      showProperties ? "Hide" : "Show",
      " Properties"
    )), /* @__PURE__ */ React2.createElement(
      CrmStageTracker,
      {
        properties: stageToPropertiesMap[stage || ""],
        showProperties
      }
    ), /* @__PURE__ */ React2.createElement(Accordion, { title: "Association Labels", size: "small", defaultOpen: true }, /* @__PURE__ */ React2.createElement(
      CrmAssociationPivot,
      {
        objectTypeId: "0-1",
        associationLabels: ["CEO"],
        maxAssociations: 10,
        sort: [
          {
            columnName: "createdate",
            direction: -1
          }
        ]
      }
    )));
  };
})(React, RemoteUI);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhZ2VUcmFja2VyRXh0ZW5zaW9uLmpzIiwic291cmNlcyI6WyIuLi9leHRlbnNpb25zL25vZGVfbW9kdWxlcy9AaHVic3BvdC91aS1leHRlbnNpb25zL2Rpc3QvaHVic3BvdC5qcyIsIi4uL2V4dGVuc2lvbnMvbm9kZV9tb2R1bGVzL0BodWJzcG90L3VpLWV4dGVuc2lvbnMvZGlzdC9jb3JlQ29tcG9uZW50cy5qcyIsIi4uL2V4dGVuc2lvbnMvbm9kZV9tb2R1bGVzL0BodWJzcG90L3VpLWV4dGVuc2lvbnMvZGlzdC90eXBlcy5qcyIsIi4uL2V4dGVuc2lvbnMvbm9kZV9tb2R1bGVzL0BodWJzcG90L3VpLWV4dGVuc2lvbnMvZGlzdC91dGlscy9jcmVhdGVFeHRlbnNpb25Db21wb25lbnQuanMiLCIuLi9leHRlbnNpb25zL25vZGVfbW9kdWxlcy9AaHVic3BvdC91aS1leHRlbnNpb25zL2Rpc3QvY3JtL2NvbXBvbmVudHMuanMiLCIuLi9leHRlbnNpb25zL1N0YWdlVHJhY2tlckV4dGVuc2lvbi50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgaHVic3BvdC1kZXYvbm8tY29uZnVzaW5nLWJyb3dzZXItZ2xvYmFscyAqL1xuaW1wb3J0IHsgY3JlYXRlUm9vdCB9IGZyb20gJ0ByZW1vdGUtdWkvcmVhY3QnO1xuaW1wb3J0IHsgaXNWYWxpZEVsZW1lbnQgfSBmcm9tICdyZWFjdCc7XG5leHBvcnQgY29uc3QgaHVic3BvdCA9IHtcbiAgICBleHRlbmQ6IHJlbmRlcixcbn07XG5jb25zdCBleHRlbmQgPSAoLi4uYXJncykgPT4gc2VsZi5leHRlbmQoLi4uYXJncyk7XG5mdW5jdGlvbiByZW5kZXIocmVuZGVyQ2FsbGJhY2spIHtcbiAgICByZXR1cm4gZXh0ZW5kKChyb290LCBhcGkpID0+IHtcbiAgICAgICAgY29uc3QgcmVuZGVyQ2FsbGJhY2tSZXN1bHQgPSByZW5kZXJDYWxsYmFjayhhcGkpO1xuICAgICAgICBpZiAoIWlzVmFsaWRFbGVtZW50KHJlbmRlckNhbGxiYWNrUmVzdWx0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBbaHVic3BvdC5leHRlbmRdOiBFeHBlY3RlZCBjYWxsYmFjayBmdW5jdGlvbiB0byByZXR1cm4gYSB2YWxpZCBlbGVtZW50LCBnb3Q6ICR7cmVuZGVyQ2FsbGJhY2tSZXN1bHR9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY3JlYXRlUm9vdChyb290KS5yZW5kZXIocmVuZGVyQ2FsbGJhY2tSZXN1bHQpO1xuICAgICAgICByb290Lm1vdW50KCk7XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCB9IGZyb20gJ0ByZW1vdGUtdWkvcmVhY3QnO1xuZXhwb3J0IGNvbnN0IEFsZXJ0ID0gY3JlYXRlUmVtb3RlUmVhY3RDb21wb25lbnQoJ0FsZXJ0Jyk7XG5leHBvcnQgY29uc3QgQnV0dG9uID0gY3JlYXRlUmVtb3RlUmVhY3RDb21wb25lbnQoJ0J1dHRvbicpO1xuZXhwb3J0IGNvbnN0IEJ1dHRvblJvdyA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KCdCdXR0b25Sb3cnKTtcbmV4cG9ydCBjb25zdCBDYXJkID0gY3JlYXRlUmVtb3RlUmVhY3RDb21wb25lbnQoJ0NhcmQnKTtcbmV4cG9ydCBjb25zdCBEZXNjcmlwdGlvbkxpc3QgPSBjcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCgnRGVzY3JpcHRpb25MaXN0Jyk7XG5leHBvcnQgY29uc3QgRGVzY3JpcHRpb25MaXN0SXRlbSA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KCdEZXNjcmlwdGlvbkxpc3RJdGVtJyk7XG5leHBvcnQgY29uc3QgRGl2aWRlciA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KCdEaXZpZGVyJyk7XG5leHBvcnQgY29uc3QgRW1wdHlTdGF0ZSA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KCdFbXB0eVN0YXRlJyk7XG5leHBvcnQgY29uc3QgRXJyb3JTdGF0ZSA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KCdFcnJvclN0YXRlJyk7XG5leHBvcnQgY29uc3QgRm9ybSA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KCdGb3JtJyk7XG5leHBvcnQgY29uc3QgSGVhZGluZyA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KCdIZWFkaW5nJyk7XG5leHBvcnQgY29uc3QgSW1hZ2UgPSBjcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCgnSW1hZ2UnKTtcbmV4cG9ydCBjb25zdCBJbnB1dCA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KCdJbnB1dCcpO1xuZXhwb3J0IGNvbnN0IExpbmsgPSBjcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCgnTGluaycpO1xuZXhwb3J0IGNvbnN0IFRleHRBcmVhID0gY3JlYXRlUmVtb3RlUmVhY3RDb21wb25lbnQoJ1RleHRBcmVhJyk7XG4vLyBUZXh0YXJlYSB3YXMgY2hhbmdlZCB0byBUZXh0QXJlYVxuLy8gRXhwb3J0aW5nIGJvdGggZm9yIGJhY2t3YXJkcyBjb21wYXRcbmV4cG9ydCBjb25zdCBUZXh0YXJlYSA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KCdUZXh0YXJlYScpO1xuZXhwb3J0IGNvbnN0IExvYWRpbmdTcGlubmVyID0gY3JlYXRlUmVtb3RlUmVhY3RDb21wb25lbnQoJ0xvYWRpbmdTcGlubmVyJyk7XG5leHBvcnQgY29uc3QgUHJvZ3Jlc3NCYXIgPSBjcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCgnUHJvZ3Jlc3NCYXInKTtcbmV4cG9ydCBjb25zdCBTZWxlY3QgPSBjcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCgnU2VsZWN0Jyk7XG5leHBvcnQgY29uc3QgVGFnID0gY3JlYXRlUmVtb3RlUmVhY3RDb21wb25lbnQoJ1RhZycpO1xuZXhwb3J0IGNvbnN0IFRleHQgPSBjcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCgnVGV4dCcpO1xuZXhwb3J0IGNvbnN0IFRpbGUgPSBjcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCgnVGlsZScpO1xuZXhwb3J0IGNvbnN0IFN0YWNrID0gY3JlYXRlUmVtb3RlUmVhY3RDb21wb25lbnQoJ1N0YWNrJyk7XG5leHBvcnQgY29uc3QgVG9nZ2xlR3JvdXAgPSBjcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCgnVG9nZ2xlR3JvdXAnKTtcbmV4cG9ydCBjb25zdCBTdGF0aXN0aWNzSXRlbSA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KCdTdGF0aXN0aWNzSXRlbScpO1xuZXhwb3J0IGNvbnN0IFN0YXRpc3RpY3MgPSBjcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCgnU3RhdGlzdGljcycpO1xuZXhwb3J0IGNvbnN0IFN0YXRpc3RpY3NUcmVuZCA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KCdTdGF0aXN0aWNzVHJlbmQnKTtcbmV4cG9ydCBjb25zdCBUYWJsZSA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KCdUYWJsZScpO1xuZXhwb3J0IGNvbnN0IFRhYmxlRm9vdGVyID0gY3JlYXRlUmVtb3RlUmVhY3RDb21wb25lbnQoJ1RhYmxlRm9vdGVyJyk7XG5leHBvcnQgY29uc3QgVGFibGVDZWxsID0gY3JlYXRlUmVtb3RlUmVhY3RDb21wb25lbnQoJ1RhYmxlQ2VsbCcpO1xuZXhwb3J0IGNvbnN0IFRhYmxlUm93ID0gY3JlYXRlUmVtb3RlUmVhY3RDb21wb25lbnQoJ1RhYmxlUm93Jyk7XG5leHBvcnQgY29uc3QgVGFibGVCb2R5ID0gY3JlYXRlUmVtb3RlUmVhY3RDb21wb25lbnQoJ1RhYmxlQm9keScpO1xuZXhwb3J0IGNvbnN0IFRhYmxlSGVhZGVyID0gY3JlYXRlUmVtb3RlUmVhY3RDb21wb25lbnQoJ1RhYmxlSGVhZGVyJyk7XG5leHBvcnQgY29uc3QgVGFibGVIZWFkID0gY3JlYXRlUmVtb3RlUmVhY3RDb21wb25lbnQoJ1RhYmxlSGVhZCcpO1xuZXhwb3J0IGNvbnN0IE51bWJlcklucHV0ID0gY3JlYXRlUmVtb3RlUmVhY3RDb21wb25lbnQoJ051bWJlcklucHV0Jyk7XG5leHBvcnQgY29uc3QgQm94ID0gY3JlYXRlUmVtb3RlUmVhY3RDb21wb25lbnQoJ0JveCcpO1xuZXhwb3J0IGNvbnN0IFN0ZXBJbmRpY2F0b3IgPSBjcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCgnU3RlcEluZGljYXRvcicpO1xuZXhwb3J0IGNvbnN0IEFjY29yZGlvbiA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KCdBY2NvcmRpb24nKTtcbmV4cG9ydCBjb25zdCBNdWx0aVNlbGVjdCA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KCdNdWx0aVNlbGVjdCcpO1xuZXhwb3J0IGNvbnN0IEZsZXggPSBjcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCgnRmxleCcpO1xuIiwiZXhwb3J0IHZhciBTZXJ2ZXJsZXNzRXhlY3V0aW9uU3RhdHVzO1xuKGZ1bmN0aW9uIChTZXJ2ZXJsZXNzRXhlY3V0aW9uU3RhdHVzKSB7XG4gICAgU2VydmVybGVzc0V4ZWN1dGlvblN0YXR1c1tcIlN1Y2Nlc3NcIl0gPSBcIlNVQ0NFU1NcIjtcbiAgICBTZXJ2ZXJsZXNzRXhlY3V0aW9uU3RhdHVzW1wiRXJyb3JcIl0gPSBcIkVSUk9SXCI7XG59KShTZXJ2ZXJsZXNzRXhlY3V0aW9uU3RhdHVzIHx8IChTZXJ2ZXJsZXNzRXhlY3V0aW9uU3RhdHVzID0ge30pKTtcbmV4cG9ydCBjbGFzcyBSZW1vdGVFdmVudCB7XG4gICAgdHlwZTtcbiAgICBidWJibGVzO1xuICAgIHRpbWVTdGFtcDtcbiAgICB0YXJnZXRWYWx1ZTtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5idWJibGVzID0gZXZlbnQuYnViYmxlcztcbiAgICAgICAgdGhpcy50eXBlID0gZXZlbnQudHlwZTtcbiAgICAgICAgdGhpcy50aW1lU3RhbXAgPSBldmVudC50aW1lU3RhbXA7XG4gICAgICAgIHRoaXMudGFyZ2V0VmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCB9IGZyb20gJ0ByZW1vdGUtdWkvcmVhY3QnO1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUV4dGVuc2lvbkNvbXBvbmVudChjb21wb25lbnRUeXBlKSB7XG4gICAgcmV0dXJuIGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KGNvbXBvbmVudFR5cGUpO1xufVxuIiwiaW1wb3J0IHsgY3JlYXRlRXh0ZW5zaW9uQ29tcG9uZW50IH0gZnJvbSAnLi4vdXRpbHMvY3JlYXRlRXh0ZW5zaW9uQ29tcG9uZW50JztcbmNvbnN0IENybU9iamVjdFByb3BlcnR5ID0gY3JlYXRlRXh0ZW5zaW9uQ29tcG9uZW50KCdDcm1PYmplY3RQcm9wZXJ0eScpO1xuY29uc3QgQ3JtUHJvcGVydHlMaXN0ID0gY3JlYXRlRXh0ZW5zaW9uQ29tcG9uZW50KCdDcm1Qcm9wZXJ0eUxpc3QnKTtcbmNvbnN0IENybUFzc29jaWF0aW9uVGFibGUgPSBjcmVhdGVFeHRlbnNpb25Db21wb25lbnQoJ0NybUFzc29jaWF0aW9uVGFibGUnKTtcbmNvbnN0IENybURhdGFIaWdobGlnaHQgPSBjcmVhdGVFeHRlbnNpb25Db21wb25lbnQoJ0NybURhdGFIaWdobGlnaHQnKTtcbmNvbnN0IENybVJlcG9ydCA9IGNyZWF0ZUV4dGVuc2lvbkNvbXBvbmVudCgnQ3JtUmVwb3J0Jyk7XG5jb25zdCBDcm1Bc3NvY2lhdGlvblBpdm90ID0gY3JlYXRlRXh0ZW5zaW9uQ29tcG9uZW50KCdDcm1Bc3NvY2lhdGlvblBpdm90Jyk7XG5jb25zdCBDcm1Bc3NvY2lhdGlvblByb3BlcnR5TGlzdCA9IGNyZWF0ZUV4dGVuc2lvbkNvbXBvbmVudCgnQ3JtQXNzb2NpYXRpb25Qcm9wZXJ0eUxpc3QnKTtcbmNvbnN0IENybVN0YWdlVHJhY2tlciA9IGNyZWF0ZUV4dGVuc2lvbkNvbXBvbmVudCgnQ3JtU3RhZ2VUcmFja2VyJyk7XG5leHBvcnQgeyBDcm1PYmplY3RQcm9wZXJ0eSwgQ3JtUHJvcGVydHlMaXN0LCBDcm1Bc3NvY2lhdGlvblRhYmxlLCBDcm1EYXRhSGlnaGxpZ2h0LCBDcm1SZXBvcnQsIENybUFzc29jaWF0aW9uUGl2b3QsIENybUFzc29jaWF0aW9uUHJvcGVydHlMaXN0LCBDcm1TdGFnZVRyYWNrZXIsIH07XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBodWJzcG90LFxuICBCdXR0b24sXG4gIEZvcm0sXG4gIFNlbGVjdCxcbiAgQWNjb3JkaW9uLFxuICBGbGV4LFxuICBIZWFkaW5nLFxuICBBbGVydCxcbn0gZnJvbSAnQGh1YnNwb3QvdWktZXh0ZW5zaW9ucyc7XG5pbXBvcnQge1xuICBDcm1TdGFnZVRyYWNrZXIsXG4gIENybUFzc29jaWF0aW9uUGl2b3QsXG59IGZyb20gJ0BodWJzcG90L3VpLWV4dGVuc2lvbnMvY3JtJztcblxuaHVic3BvdC5leHRlbmQoKHsgY29udGV4dCwgYWN0aW9ucywgcnVuU2VydmVybGVzc0Z1bmN0aW9uIH0pID0+IChcbiAgPEV4dGVuc2lvblxuICAgIGNvbnRleHQ9e2NvbnRleHR9XG4gICAgcnVuU2VydmVybGVzcz17cnVuU2VydmVybGVzc0Z1bmN0aW9ufVxuICAgIGZldGNoQ3JtT2JqZWN0UHJvcGVydGllcz17YWN0aW9ucy5mZXRjaENybU9iamVjdFByb3BlcnRpZXN9XG4gICAgYWRkQWxlcnQ9e2FjdGlvbnMuYWRkQWxlcnR9XG4gIC8+XG4pKTtcblxuY29uc3QgRXh0ZW5zaW9uID0gKHtcbiAgY29udGV4dCxcbiAgcnVuU2VydmVybGVzcyxcbiAgZmV0Y2hDcm1PYmplY3RQcm9wZXJ0aWVzLFxuICBhZGRBbGVydCxcbn0pID0+IHtcbiAgY29uc3QgW3N0YWdlLCBzZXRTdGFnZV0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3Nob3dQcm9wZXJ0aWVzLCBzZXRTaG93UHJvcGVydGllc10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2RlYWxJZCwgc2V0RGVhbElkXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbZGVhbG5hbWUsIHNldERlYWxuYW1lXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKCcnKTtcblxuICBjb25zdCBzdGFnZVRvUHJvcGVydGllc01hcDogeyBba2V5OiBzdHJpbmddOiBzdHJpbmdbXSB9ID0ge1xuICAgIGFwcG9pbnRtZW50c2NoZWR1bGVkOiBbXG4gICAgICAnZGVhbG5hbWUnLFxuICAgICAgJ2VuZ2FnZW1lbnRzX2xhc3RfbWVldGluZ19ib29rZWQnLFxuICAgICAgJ2RlYWx0eXBlJyxcbiAgICBdLFxuICAgIHF1YWxpZmllZHRvYnV5OiBbJ2h1YnNwb3Rfb3duZXJfaWQnLCAnYW1vdW50JywgJ2RlYWx0eXBlJywgJ2hzX3ByaW9yaXR5J10sXG4gICAgcHJlc2VudGF0aW9uc2NoZWR1bGVkOiBbXG4gICAgICAnaHNfcHJpb3JpdHknLFxuICAgICAgJ2hzX2RlYWxfc3RhZ2VfcHJvYmFiaWxpdHknLFxuICAgICAgJ2hzX2ZvcmVjYXN0X2Ftb3VudCcsXG4gICAgXSxcbiAgICBkZWNpc2lvbm1ha2VyYm91Z2h0aW46IFtcbiAgICAgICdoc19kZWFsX3N0YWdlX3Byb2JhYmlsaXR5JyxcbiAgICAgICdoc190Y3YnLFxuICAgICAgJ2Ftb3VudCcsXG4gICAgICAnbm90ZXNfbGFzdF9jb250YWN0ZWQnLFxuICAgIF0sXG4gICAgY29udHJhY3RzZW50OiBbJ2NyZWF0ZWRhdGUnLCAnaHNfYWN2JywgJ2hzX2RlYWxfc3RhZ2VfcHJvYmFiaWxpdHknXSxcbiAgICBjbG9zZWR3b246IFsnY2xvc2VkX3dvbl9yZWFzb24nLCAnY2xvc2VkYXRlJywgJ2Ftb3VudCddLFxuICAgIGNsb3NlZGxvc3Q6IFsnY2xvc2VkYXRlJywgJ2Nsb3NlZF9sb3N0X3JlYXNvbicsICdhbW91bnQnXSxcbiAgfTtcblxuICBjb25zdCBvcHRpb25zOiBBcnJheTx7IGxhYmVsOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfT4gPSBbXG4gICAgeyBsYWJlbDogJ0FwcG9pbnRtZW50IFNjaGVkdWxlZCcsIHZhbHVlOiAnYXBwb2ludG1lbnRzY2hlZHVsZWQnIH0sXG4gICAgeyBsYWJlbDogJ1F1YWxpZmllZCB0byBCdXknLCB2YWx1ZTogJ3F1YWxpZmllZHRvYnV5JyB9LFxuICAgIHsgbGFiZWw6ICdQcmVzZW50YXRpb24gU2NoZWR1bGVkJywgdmFsdWU6ICdwcmVzZW50YXRpb25zY2hlZHVsZWQnIH0sXG4gICAgeyBsYWJlbDogJ0RlY2lzaW9uIE1ha2VyIEJvdWdodCBJbicsIHZhbHVlOiAnZGVjaXNpb25tYWtlcmJvdWdodGluJyB9LFxuICAgIHsgbGFiZWw6ICdDb250cmFjdCBTZW50JywgdmFsdWU6ICdjb250cmFjdHNlbnQnIH0sXG4gICAgeyBsYWJlbDogJ0Nsb3NlZCBXb24nLCB2YWx1ZTogJ2Nsb3NlZHdvbicgfSxcbiAgICB7IGxhYmVsOiAnQ2xvc2VkIExvc3QnLCB2YWx1ZTogJ2Nsb3NlZGxvc3QnIH0sXG4gIF07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBmZXRjaENybU9iamVjdFByb3BlcnRpZXMoWydkZWFsbmFtZScsICdkZWFsc3RhZ2UnLCAnaHNfb2JqZWN0X2lkJ10pLnRoZW4oXG4gICAgICAocHJvcGVydGllczogeyBbcHJvcGVydHlOYW1lOiBzdHJpbmddOiBhbnkgfSkgPT4ge1xuICAgICAgICBzZXRTdGFnZShwcm9wZXJ0aWVzLmRlYWxzdGFnZSk7XG4gICAgICAgIHNldERlYWxJZChwcm9wZXJ0aWVzLmhzX29iamVjdF9pZCk7XG4gICAgICAgIHNldERlYWxuYW1lKHByb3BlcnRpZXMuZGVhbG5hbWUpO1xuICAgICAgfVxuICAgICk7XG4gIH0sIFtzdGFnZV0pO1xuXG4gIGNvbnN0IGhhbmRsZVN0YWdlQ2hhbmdlID0gdXNlQ2FsbGJhY2soXG4gICAgKG5ld1N0YWdlOiBzdHJpbmcpID0+IHtcbiAgICAgIHJ1blNlcnZlcmxlc3Moe1xuICAgICAgICBuYW1lOiAndXBkYXRlRGVhbCcsXG4gICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICBkZWFsSWQ6IGRlYWxJZCEsXG4gICAgICAgICAgZGVhbFN0YWdlOiBuZXdTdGFnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pLnRoZW4oKHJlc3A6IHsgc3RhdHVzOiBzdHJpbmc7IG1lc3NhZ2U/OiBzdHJpbmcgfSkgPT4ge1xuICAgICAgICBpZiAocmVzcC5zdGF0dXMgPT09ICdTVUNDRVNTJykge1xuICAgICAgICAgIGFkZEFsZXJ0KHtcbiAgICAgICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdEZWFsIHN0YWdlIHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzZXRTdGFnZShuZXdTdGFnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0RXJyb3IocmVzcC5tZXNzYWdlIHx8ICdBbiBlcnJvciBvY2N1cnJlZCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtkZWFsSWQsIGFkZEFsZXJ0LCBydW5TZXJ2ZXJsZXNzXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZVByb3BlcnR5VG9nZ2xlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldFNob3dQcm9wZXJ0aWVzKChjdXJyZW50KSA9PiAhY3VycmVudCk7XG4gIH0sIFtdKTtcblxuICBpZiAoZXJyb3IgIT09ICcnKSB7XG4gICAgcmV0dXJuIDxBbGVydCB0aXRsZT1cIkVycm9yXCI+e2Vycm9yfTwvQWxlcnQ+O1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8RmxleCBkaXJlY3Rpb249XCJjb2x1bW5cIiBqdXN0aWZ5PVwic3RhcnRcIiBnYXA9XCJtZWRpdW1cIj5cbiAgICAgIDxIZWFkaW5nPkRlYWwgc3RhdHVzIDoge2RlYWxuYW1lfTwvSGVhZGluZz5cbiAgICAgIDxGbGV4IGRpcmVjdGlvbj1cInJvd1wiIGp1c3RpZnk9XCJzdGFydFwiIGFsaWduPVwiZW5kXCIgZ2FwPVwibWVkaXVtXCI+XG4gICAgICAgIDxGb3JtPlxuICAgICAgICAgIDxTZWxlY3RcbiAgICAgICAgICAgIGxhYmVsPVwiVXBkYXRlIERlYWwgU3RhZ2VcIlxuICAgICAgICAgICAgbmFtZT1cImRlYWwtc3RhZ2VcIlxuICAgICAgICAgICAgdG9vbHRpcD1cIlBsZWFzZSBjaG9vc2VcIlxuICAgICAgICAgICAgdmFsdWU9e3N0YWdlfVxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZVN0YWdlQ2hhbmdlfVxuICAgICAgICAgICAgb3B0aW9ucz17b3B0aW9uc31cbiAgICAgICAgICAvPlxuICAgICAgICA8L0Zvcm0+XG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICB2YXJpYW50PXtzaG93UHJvcGVydGllcyA/ICdwcmltYXJ5JyA6ICdzZWNvbmRhcnknfVxuICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVByb3BlcnR5VG9nZ2xlfVxuICAgICAgICA+XG4gICAgICAgICAge3Nob3dQcm9wZXJ0aWVzID8gJ0hpZGUnIDogJ1Nob3cnfSBQcm9wZXJ0aWVzXG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9GbGV4PlxuICAgICAgPENybVN0YWdlVHJhY2tlclxuICAgICAgICBwcm9wZXJ0aWVzPXtzdGFnZVRvUHJvcGVydGllc01hcFtzdGFnZSB8fCAnJ119XG4gICAgICAgIHNob3dQcm9wZXJ0aWVzPXtzaG93UHJvcGVydGllc31cbiAgICAgIC8+XG4gICAgICA8QWNjb3JkaW9uIHRpdGxlPVwiQXNzb2NpYXRpb24gTGFiZWxzXCIgc2l6ZT1cInNtYWxsXCIgZGVmYXVsdE9wZW49e3RydWV9PlxuICAgICAgICA8Q3JtQXNzb2NpYXRpb25QaXZvdFxuICAgICAgICAgIG9iamVjdFR5cGVJZD1cIjAtMVwiXG4gICAgICAgICAgYXNzb2NpYXRpb25MYWJlbHM9e1snQ0VPJ119XG4gICAgICAgICAgbWF4QXNzb2NpYXRpb25zPXsxMH1cbiAgICAgICAgICBzb3J0PXtbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNvbHVtbk5hbWU6ICdjcmVhdGVkYXRlJyxcbiAgICAgICAgICAgICAgZGlyZWN0aW9uOiAtMSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXX1cbiAgICAgICAgLz5cbiAgICAgIDwvQWNjb3JkaW9uPlxuICAgIDwvRmxleD5cbiAgKTtcbn07XG4iXSwibmFtZXMiOlsiaXNWYWxpZEVsZW1lbnQiLCJjcmVhdGVSb290IiwiY3JlYXRlUmVtb3RlUmVhY3RDb21wb25lbnQiLCJTZXJ2ZXJsZXNzRXhlY3V0aW9uU3RhdHVzIiwiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZUNhbGxiYWNrIl0sIm1hcHBpbmdzIjoiOztBQUdPLFFBQU0sVUFBVTtBQUFBLElBQ25CLFFBQVE7QUFBQSxFQUNaO0FBQ0EsUUFBTSxTQUFTLElBQUksU0FBUyxLQUFLLE9BQU8sR0FBRyxJQUFJO0FBQy9DLFdBQVMsT0FBTyxnQkFBZ0I7QUFDNUIsV0FBTyxPQUFPLENBQUMsTUFBTSxRQUFRO0FBQ3pCLFlBQU0sdUJBQXVCLGVBQWUsR0FBRztBQUMvQyxVQUFJLENBQUNBLE9BQUFBLGVBQWUsb0JBQW9CLEdBQUc7QUFDdkMsY0FBTSxJQUFJLE1BQU0sZ0ZBQWdGLG9CQUFvQixFQUFFO0FBQUEsTUFDekg7QUFDREMsWUFBQUEsV0FBVyxJQUFJLEVBQUUsT0FBTyxvQkFBb0I7QUFDNUMsV0FBSyxNQUFLO0FBQUEsSUFDbEIsQ0FBSztBQUFBLEVBQ0w7QUNmTyxRQUFNLFFBQVFDLE1BQUFBLDJCQUEyQixPQUFPO0FBQ2hELFFBQU0sU0FBU0EsTUFBQUEsMkJBQTJCLFFBQVE7QUFDTixRQUFBLDJCQUFDLFdBQVc7QUFDakIsUUFBQSwyQkFBQyxNQUFNO0FBQ0ksUUFBQSwyQkFBQyxpQkFBaUI7QUFDZCxRQUFBLDJCQUFDLHFCQUFxQjtBQUNsQyxRQUFBLDJCQUFDLFNBQVM7QUFDUCxRQUFBLDJCQUFDLFlB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QUFTO0FBQUEsWUFBQSxDQUNWO0FBQ0QscUJBQVMsUUFBUTtBQUFBLFVBQUEsT0FDWjtBQUNJLHFCQUFBLEtBQUssV0FBVyxtQkFBbUI7QUFBQSxVQUM5QztBQUFBLFFBQUEsQ0FDRDtBQUFBLE1BQ0g7QUFBQSxNQUNBLENBQUMsUUFBUSxVQUFVLGFBQWE7QUFBQSxJQUFBO0FBRzVCLFVBQUEsdUJBQXVCQSxPQUFBQSxZQUFZLE1BQU07QUFDM0Isd0JBQUEsQ0FBQyxZQUFZLENBQUMsT0FBTztBQUFBLElBQ3pDLEdBQUcsQ0FBRSxDQUFBO0FBRUwsUUFBSSxVQUFVLElBQUk7QUFDaEIsYUFBUSxnQkFBQUgsT0FBQSxjQUFBLE9BQUEsRUFBTSxPQUFNLFFBQUEsR0FBUyxLQUFNO0FBQUEsSUFDckM7QUFHRSxXQUFBLGdCQUFBQSxPQUFBLGNBQUMsTUFBSyxFQUFBLFdBQVUsVUFBUyxTQUFRLFNBQVEsS0FBSSxTQUFBLEdBQzFDLGdCQUFBQSxPQUFBLGNBQUEsU0FBQSxNQUFRLGtCQUFlLFFBQVMsR0FDaEMsZ0JBQUFBLE9BQUEsY0FBQSxNQUFBLEVBQUssV0FBVSxPQUFNLFNBQVEsU0FBUSxPQUFNLE9BQU0sS0FBSSxTQUNwRCxHQUFBLGdCQUFBQSxPQUFBLGNBQUMsTUFDQyxNQUFBLGdCQUFBQSxPQUFBO0FBQUEsTUFBQztBQUFBLE1BQUE7QUFBQSxRQUNDLE9BQU07QUFBQSxRQUNOLE1BQUs7QUFBQSxRQUNMLFNBQVE7QUFBQSxRQUNSLE9BQU87QUFBQSxRQUNQLFVBQVU7QUFBQSxRQUNWO0FBQUEsTUFBQTtBQUFBLElBQUEsQ0FFSixHQUNBLGdCQUFBQSxPQUFBO0FBQUEsTUFBQztBQUFBLE1BQUE7QUFBQSxRQUNDLFNBQVMsaUJBQWlCLFlBQVk7QUFBQSxRQUN0QyxTQUFTO0FBQUEsTUFBQTtBQUFBLE1BRVIsaUJBQWlCLFNBQVM7QUFBQSxNQUFPO0FBQUEsSUFBQSxDQUV0QyxHQUNBLGdCQUFBQSxPQUFBO0FBQUEsTUFBQztBQUFBLE1BQUE7QUFBQSxRQUNDLFlBQVkscUJBQXFCLFNBQVMsRUFBRTtBQUFBLFFBQzVDO0FBQUEsTUFBQTtBQUFBLElBQ0Ysd0NBQ0MsV0FBVSxFQUFBLE9BQU0sc0JBQXFCLE1BQUssU0FBUSxhQUFhLEtBQzlELEdBQUEsZ0JBQUFBLE9BQUE7QUFBQSxNQUFDO0FBQUEsTUFBQTtBQUFBLFFBQ0MsY0FBYTtBQUFBLFFBQ2IsbUJBQW1CLENBQUMsS0FBSztBQUFBLFFBQ3pCLGlCQUFpQjtBQUFBLFFBQ2pCLE1BQU07QUFBQSxVQUNKO0FBQUEsWUFDRSxZQUFZO0FBQUEsWUFDWixXQUFXO0FBQUEsVUFDYjtBQUFBLFFBQ0Y7QUFBQSxNQUFBO0FBQUEsSUFFSixDQUFBLENBQ0Y7QUFBQSxFQUVKOzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwxLDIsMyw0XX0=
