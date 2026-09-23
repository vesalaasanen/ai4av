---
spec_id: admin/riedel-communications-smart-panel
schema_version: ai4av-public-spec-v1
revision: 1
title: "Riedel Communications Smart Panel Control Spec"
manufacturer: "Riedel Communications"
model_family: "Smart Panel"
aliases: []
compatible_with:
  manufacturers:
    - "Riedel Communications"
  models:
    - "Smart Panel"
  firmware: "v2.0.0 or higher (recommended by source; no tested range stated)"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - riedel.net
  - github.com
source_urls:
  - https://www.riedel.net/en/products-solutions/intercom/smartpanels/1200-series/
  - https://github.com/bitfocus/companion-module-riedel-smartpanel
retrieved_at: 2026-08-30T10:32:57.239Z
last_checked_at: 2026-09-18T22:18:35.585Z
generated_at: 2026-09-18T22:18:35.585Z
firmware_coverage: "v2.0.0 or higher (recommended by source; no tested range stated)"
protocol_coverage: []
known_gaps:
  - "request/response body schemas per topic not documented in source — only topic paths and message envelope are specified"
  - "body schema not documented in source"
  - "response formats per topic not documented in source"
  - "settings payload schemas not documented in source"
  - "WebSocket push/event behavior not documented in source"
  - "no safety warnings in source; reboot action is destructive but source states no confirmation policy"
  - "error response behavior, ack format, and connection lifecycle (reconnect/heartbeat) not documented in source"
  - "source path given as riedel_communications_smart_panel.refined.md not found; used riedel_communications_smart_panel_companion.refined.md"
verification:
  verdict: verified
  checked_at: 2026-09-18T22:18:35.585Z
  matched_actions: 19
  action_count: 19
  confidence: medium
  summary: "All 19 spec action topic strings appear verbatim in the source's Supported Topics table; WebSocket URL and port 80 are documented; JSON envelope matches. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - community_report
license: ODbL-1.0
created_at: 2026-09-02
---

# Riedel Communications Smart Panel Control Spec

## Summary
Control spec for the Riedel Communications Smart Panel, driven by a JSON-over-WebSocket interface at `ws://<host>:<port>/websocket` (default port 80). Covers network configuration and status, device info/settings, firmware version query, reboot, health/alarm monitoring, PTP configuration, Control Panel app enable/disable, and NMOS enable/disable. Source is the Bitfocus Companion community module README, not a native vendor protocol manual.

<!-- UNRESOLVED: request/response body schemas per topic not documented in source — only topic paths and message envelope are specified -->

## Transport
```yaml
# WebSocket rides on TCP via HTTP upgrade; application framing is JSON {topic, body}.
protocols:
  - tcp
  - http  # WebSocket upgrade over HTTP
addressing:
  port: 80  # source: "WebSocket port (usually 80)", default 80
  base_url: "ws://<host>:<port>/websocket"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable   (no power on/off commands in source; reboot only)
# - routable    (no input/output routing commands; network interface config is not A/V routing)
# - levelable   (no volume/gain/brightness controls)
- queryable  # inferred from Fetch* query topics
```

## Actions
```yaml
# Message envelope from source: {"topic": "/Path/To/Endpoint", "body": {}}
# Each entry below is one row of the source's Supported Topics table.

- id: network_status_fetch
  label: Fetch Network Status
  kind: query
  command: '{"topic":"/NetworkStatus/FetchNetworkStatus","body":{}}'
  params: []

- id: network_settings_fetch
  label: Fetch Network Settings
  kind: query
  command: '{"topic":"/NetworkSettings/FetchNetworkSettings","body":{}}'
  params: []

- id: network_settings_update
  label: Update Network Settings
  kind: action
  command: '{"topic":"/NetworkSettings/UpdateNetworkSettings","body":{}}'
  params:
    - name: settings
      type: object
      description: Network settings payload  # UNRESOLVED: body schema not documented in source

- id: device_info_fetch
  label: Fetch Device Info
  kind: query
  command: '{"topic":"/DeviceInfo/FetchDeviceInfo","body":{}}'
  params: []

- id: device_settings_fetch
  label: Fetch Device Settings
  kind: query
  command: '{"topic":"/DeviceSettings/FetchDeviceSettings","body":{}}'
  params: []

- id: firmware_version_fetch
  label: Fetch Firmware Version
  kind: query
  command: '{"topic":"/FirmwareUpdater/FetchFirmwareVersion","body":{}}'
  params: []

- id: device_reboot
  label: Reboot Device
  kind: action
  command: '{"topic":"/Reboot/RebootDevice","body":{}}'
  params: []

- id: health_status_fetch
  label: Fetch Health Status
  kind: query
  command: '{"topic":"/StatusInfo/FetchHealthStatus","body":{}}'
  params: []

- id: alarm_list_fetch
  label: Fetch Active Alarms
  kind: query
  command: '{"topic":"/StatusInfo/FetchAlarmList","body":{}}'
  params: []

- id: alarm_history_fetch
  label: Fetch Alarm History
  kind: query
  command: '{"topic":"/StatusInfo/FetchAlarmHistory","body":{}}'
  params: []

- id: ptp_status_fetch
  label: Fetch PTP Status
  kind: query
  command: '{"topic":"/Ptp/FetchPtpStatus","body":{}}'
  params: []

- id: ptp_settings_fetch
  label: Fetch PTP Settings
  kind: query
  command: '{"topic":"/Ptp/FetchPtpSettings","body":{}}'
  params: []

- id: ptp_settings_update
  label: Update PTP Settings
  kind: action
  command: '{"topic":"/Ptp/UpdatePtpSettings","body":{}}'
  params:
    - name: settings
      type: object
      description: PTP settings payload  # UNRESOLVED: body schema not documented in source

- id: control_panel_config_fetch
  label: Fetch Control Panel Config
  kind: query
  command: '{"topic":"/ControlPanelApp/FetchConfig","body":{}}'
  params: []

- id: control_panel_enable
  label: Enable Control Panel
  kind: action
  command: '{"topic":"/ControlPanelApp/Enable","body":{}}'
  params: []

- id: control_panel_disable
  label: Disable Control Panel
  kind: action
  command: '{"topic":"/ControlPanelApp/Disable","body":{}}'
  params: []

- id: nmos_status_fetch
  label: Fetch NMOS Status
  kind: query
  command: '{"topic":"/Nmos/FetchStatus","body":{}}'
  params: []

- id: nmos_enable
  label: Enable NMOS
  kind: action
  command: '{"topic":"/Nmos/Enable","body":{}}'
  params: []

- id: nmos_disable
  label: Disable NMOS
  kind: action
  command: '{"topic":"/Nmos/Disable","body":{}}'
  params: []
```

## Feedbacks
```yaml
# Source documents query topics that return data (network status, device info,
# health status, alarm list/history, PTP status, control panel config, NMOS status)
# but does not document any response body schema or field names.
# UNRESOLVED: response formats per topic not documented in source
```

## Variables
```yaml
# Settable parameter groups exist (UpdateNetworkSettings, UpdatePtpSettings) but
# the source does not enumerate their fields.
# UNRESOLVED: settings payload schemas not documented in source
```

## Events
```yaml
# No unsolicited/subscription messages documented in source.
# UNRESOLVED: WebSocket push/event behavior not documented in source
```

## Macros
```yaml
# No multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []  # UNRESOLVED: no safety warnings in source; reboot action is destructive but source states no confirmation policy
interlocks: []
```

## Notes
- Device has three network interfaces: Media1 (primary media), Config1 (configuration), Media2 (secondary media).
- Message format is a JSON envelope: `{"topic": "/Path/To/Endpoint", "body": {}}` sent over the WebSocket connection.
- Module compatibility stated as Companion v3.0 and later; panel firmware v2.0.0 or higher recommended.
<!-- UNRESOLVED: error response behavior, ack format, and connection lifecycle (reconnect/heartbeat) not documented in source -->
<!-- UNRESOLVED: source path given as riedel_communications_smart_panel.refined.md not found; used riedel_communications_smart_panel_companion.refined.md -->

## Provenance

```yaml
source_domains:
  - riedel.net
  - github.com
source_urls:
  - https://www.riedel.net/en/products-solutions/intercom/smartpanels/1200-series/
  - https://github.com/bitfocus/companion-module-riedel-smartpanel
retrieved_at: 2026-08-30T10:32:57.239Z
last_checked_at: 2026-09-18T22:18:35.585Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-18T22:18:35.585Z
matched_actions: 19
action_count: 19
confidence: medium
summary: "All 19 spec action topic strings appear verbatim in the source's Supported Topics table; WebSocket URL and port 80 are documented; JSON envelope matches. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "request/response body schemas per topic not documented in source — only topic paths and message envelope are specified"
- "body schema not documented in source"
- "response formats per topic not documented in source"
- "settings payload schemas not documented in source"
- "WebSocket push/event behavior not documented in source"
- "no safety warnings in source; reboot action is destructive but source states no confirmation policy"
- "error response behavior, ack format, and connection lifecycle (reconnect/heartbeat) not documented in source"
- "source path given as riedel_communications_smart_panel.refined.md not found; used riedel_communications_smart_panel_companion.refined.md"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
