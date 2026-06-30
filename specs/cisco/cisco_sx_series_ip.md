---
spec_id: admin/cisco-sx-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Cisco SX Series Control Spec"
manufacturer: Cisco
model_family: "SX10 Quick Set"
aliases: []
compatible_with:
  manufacturers:
    - Cisco
  models:
    - "SX10 Quick Set"
    - "SX20 Quick Set"
    - "SX80 Codec"
  firmware: "\"CE9.15\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cisco.com
source_urls:
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/ce915/collaboration-endpoint-software-api-reference-guide-ce915.pdf
retrieved_at: 2026-06-25T10:06:05.938Z
last_checked_at: 2026-06-25T15:31:42.365Z
generated_at: 2026-06-25T15:31:42.365Z
firmware_coverage: "\"CE9.15\""
protocol_coverage: []
known_gaps:
  - "exact TCP port numbers for SSH/Telnet/HTTP not stated in source (only IP-address placeholders shown)."
  - "firmware version compatibility range across SX10/SX20/SX80 not separately stated; CE9.15 is the API guide revision."
  - "port numbers (SSH/Telnet/HTTP) not stated in source"
  - "only \"<ip-address>\" host placeholder stated; no path base documented beyond per-endpoint paths"
  - "no multi-step sequenced macros explicitly authored in source."
  - "no explicit electrical/voltage interlocks or power-sequencing"
  - "exact SSH/Telnet/HTTP TCP port numbers not stated in source — only IP-address placeholders used throughout."
  - "firmware version compatibility ranges per model not stated; CE9.15 is the API guide document revision only."
  - "protocol version numbers for H.323/SIP not stated in this control-protocol section."
  - "binary/byte-level framing for RS-232 not specified (text-line based command interface implied by examples)."
verification:
  verdict: verified
  checked_at: 2026-06-25T15:31:42.365Z
  matched_actions: 49
  action_count: 49
  confidence: medium
  summary: "deterministic presence proof: 49/49 payloads verbatim in source; stratified Sonnet sample corroborated (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-25
---

# Cisco SX Series Control Spec

## Summary
Cisco SX Series video conferencing endpoints (SX10, SX20, SX80) running Cisco Collaboration Endpoint (CE) Software. Exposes the Cisco xAPI — a hierarchical command/status/configuration/event API accessed via SSH, Telnet, HTTP/HTTPS, WebSocket, or RS-232 serial. Commands use the `xCommand` prefix; state is read via `xStatus`; persistent settings via `xConfiguration`; push notifications via `xFeedback` and `xEvent`. API structure is identical across all transport methods.

<!-- UNRESOLVED: exact TCP port numbers for SSH/Telnet/HTTP not stated in source (only IP-address placeholders shown). -->
<!-- UNRESOLVED: firmware version compatibility range across SX10/SX20/SX80 not separately stated; CE9.15 is the API guide revision. -->

## Transport
```yaml
# SX Series supports SSH, Telnet (SX-series eligible), HTTP/HTTPS, WebSocket
# (over HTTP), and RS-232 serial. All transports expose the same xAPI.
# Telnet is disabled by default; SSH enabled by default; serial enabled by
# default. WebSocket requires HTTP/HTTPS enabled.
protocols:
  - tcp       # SSH, Telnet, HTTP/HTTPS, WebSocket all carried over TCP/IP
  - serial    # RS-232
addressing:
  # Source uses <ip-address> placeholders for all HTTP/SSH/Telnet URLs.
  # No explicit port number stated for any service.
  port: null  # UNRESOLVED: port numbers (SSH/Telnet/HTTP) not stated in source
  base_url: null  # UNRESOLVED: only "<ip-address>" host placeholder stated; no path base documented beyond per-endpoint paths
serial:
  baud_rate: 38400  # default for SX10 and SX80; SX20 defaults to 115200. Selectable: 9600/19200/38400/57600/115200. SX20 also uses 38400 briefly during initial boot sequence.
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source: "Hardware flow control: Off"
auth:
  # Source documents authentication is required, not absent.
  # - SSH: passphrase mandatory for admin user (default user "admin", no
  #   passphrase set initially but must be set).
  # - HTTP XMLAPI: HTTP Basic Access Authentication as ADMIN-role user;
  #   unauthenticated requests get 401. Session auth via
  #   /xmlapi/session/begin (SessionId cookie) recommended for repeated calls.
  # - Serial: xConfiguration SerialPort LoginRequired On by default.
  type: basic  # HTTP XMLAPI uses HTTP Basic; SSH/serial use username+passphrase login
  notes: "ADMIN role required for HTTP XMLAPI. Default user 'admin' with mandatory passphrase. Session-based auth available over HTTP to avoid per-request re-authentication. Serial LoginRequired On by default."
```

## Traits
```yaml
# Inferred from documented command examples in source:
traits:
  - powerable    # inferred: Standby Activate/Deactivate/Halfwake commands present
  - queryable    # inferred: xStatus queries (Call, Audio Volume, Standby, etc.) return values
  - routable     # inferred: Video Matrix Assign/Swap, Audio Select, Presentation Start route sources
  - levelable    # inferred: Audio Volume Set Level, Camera PositionSet pan/tilt/zoom ranges
```

## Actions
```yaml
- id: x_command_audio_diagnostics_advanced_run
  label: "xCommand Audio Diagnostics Advanced Run"
  kind: action
  command: "xCommand Audio Diagnostics Advanced Run"
  params: []

- id: x_command_audio_diagnostics_aec_reverb_reset
  label: "xCommand Audio Diagnostics AecReverb Reset"
  kind: action
  command: "xCommand Audio Diagnostics AecReverb Reset"
  params: []

- id: x_command_audio_diagnostics_aec_reverb_run
  label: "xCommand Audio Diagnostics AecReverb Run"
  kind: action
  command: "xCommand Audio Diagnostics AecReverb Run"
  params: []

- id: x_command_audio_diagnostics_measure_delay
  label: "xCommand Audio Diagnostics MeasureDelay"
  kind: action
  command: "xCommand Audio Diagnostics MeasureDelay"
  params: []

- id: x_command_audio_equalizer_list
  label: "xCommand Audio Equalizer List"
  kind: action
  command: "xCommand Audio Equalizer List"
  params: []

- id: x_command_audio_equalizer_update
  label: "xCommand Audio Equalizer Update"
  kind: action
  command: "xCommand Audio Equalizer Update"
  params: []

- id: x_command_audio_local_input_add_add_connector_remove_remove_connector_update
  label: "xCommand Audio LocalInput Add / AddConnector / Remove / RemoveConnector / Update"
  kind: action
  command: "xCommand Audio LocalInput Add / AddConnector / Remove / RemoveConnector / Update"
  params: []

- id: x_command_audio_local_output_add_add_connector_remove_remove_connector_update_connect_input_disconnect_input_update_input_gain
  label: "xCommand Audio LocalOutput Add / AddConnector / Remove / RemoveConnector / Update / ConnectInput / DisconnectInput / UpdateInputGain"
  kind: action
  command: "xCommand Audio LocalOutput Add / AddConnector / Remove / RemoveConnector / Update / ConnectInput / DisconnectInput / UpdateInputGain"
  params: []

- id: x_command_audio_remote_output_connect_input_disconnect_input_update_input_gain
  label: "xCommand Audio RemoteOutput ConnectInput / DisconnectInput / UpdateInputGain"
  kind: action
  command: "xCommand Audio RemoteOutput ConnectInput / DisconnectInput / UpdateInputGain"
  params: []

- id: x_command_audio_select
  label: "xCommand Audio Select"
  kind: action
  command: "xCommand Audio Select"
  params: []

- id: x_command_audio_sound_play_stop
  label: "xCommand Audio Sound Play / Stop"
  kind: action
  command: "xCommand Audio Sound Play / Stop"
  params: []

- id: x_command_audio_speaker_check
  label: "xCommand Audio SpeakerCheck"
  kind: action
  command: "xCommand Audio SpeakerCheck"
  params: []

- id: x_command_audio_volume_decrease
  label: "xCommand Audio Volume Decrease"
  kind: action
  command: "xCommand Audio Volume Decrease"
  params: []

- id: x_command_audio_volume_increase
  label: "xCommand Audio Volume Increase"
  kind: action
  command: "xCommand Audio Volume Increase"
  params: []

- id: x_command_audio_volume_mute
  label: "xCommand Audio Volume Mute"
  kind: action
  command: "xCommand Audio Volume Mute"
  params: []

- id: x_command_audio_volume_set
  label: "xCommand Audio Volume Set"
  kind: action
  command: "xCommand Audio Volume Set"
  params: []

- id: x_command_audio_volume_set_to_default
  label: "xCommand Audio Volume SetToDefault"
  kind: action
  command: "xCommand Audio Volume SetToDefault"
  params: []

- id: x_command_audio_volume_toggle_mute
  label: "xCommand Audio Volume ToggleMute"
  kind: action
  command: "xCommand Audio Volume ToggleMute"
  params: []

- id: x_command_audio_volume_unmute
  label: "xCommand Audio Volume Unmute"
  kind: action
  command: "xCommand Audio Volume Unmute"
  params: []

- id: x_command_audio_vu_meter_start_stop_stop_all
  label: "xCommand Audio VuMeter Start / Stop / StopAll"
  kind: action
  command: "xCommand Audio VuMeter Start / Stop / StopAll"
  params: []

- id: x_command_audio_microphones_mute_unmute_toggle_mute
  label: "xCommand Audio Microphones Mute / Unmute / ToggleMute"
  kind: action
  command: "xCommand Audio Microphones Mute / Unmute / ToggleMute"
  params: []

- id: x_command_audio_microphones_music_mode_start_stop
  label: "xCommand Audio Microphones MusicMode Start / Stop"
  kind: action
  command: "xCommand Audio Microphones MusicMode Start / Stop"
  params: []

- id: x_command_audio_microphones_noise_removal_activate_deactivate
  label: "xCommand Audio Microphones NoiseRemoval Activate / Deactivate"
  kind: action
  command: "xCommand Audio Microphones NoiseRemoval Activate / Deactivate"
  params: []

- id: x_command_call_accept
  label: "xCommand Call Accept"
  kind: action
  command: "xCommand Call Accept"
  params: []

- id: x_command_call_disconnect
  label: "xCommand Call Disconnect"
  kind: action
  command: "xCommand Call Disconnect"
  params: []

- id: x_command_call_dtmfsend
  label: "xCommand Call DTMFSend"
  kind: action
  command: "xCommand Call DTMFSend"
  params: []

- id: x_command_call_far_end_control_camera_move
  label: "xCommand Call FarEndControl Camera Move"
  kind: action
  command: "xCommand Call FarEndControl Camera Move"
  params: []

- id: x_command_call_far_end_control_camera_stop
  label: "xCommand Call FarEndControl Camera Stop"
  kind: action
  command: "xCommand Call FarEndControl Camera Stop"
  params: []

- id: x_command_call_far_end_control_request_capabilities
  label: "xCommand Call FarEndControl RequestCapabilities"
  kind: action
  command: "xCommand Call FarEndControl RequestCapabilities"
  params: []

- id: x_command_call_far_end_control_room_preset_activate_store
  label: "xCommand Call FarEndControl RoomPreset Activate / Store"
  kind: action
  command: "xCommand Call FarEndControl RoomPreset Activate / Store"
  params: []

- id: x_command_call_far_end_control_source_select
  label: "xCommand Call FarEndControl Source Select"
  kind: action
  command: "xCommand Call FarEndControl Source Select"
  params: []

- id: x_command_call_far_end_message_send_sstring_send_tstring_send
  label: "xCommand Call FarEndMessage Send / SStringSend / TStringSend"
  kind: action
  command: "xCommand Call FarEndMessage Send / SStringSend / TStringSend"
  params: []

- id: x_command_call_forward_hold_ignore_join_reject_resume_unattended_transfer
  label: "xCommand Call Forward / Hold / Ignore / Join / Reject / Resume / UnattendedTransfer"
  kind: action
  command: "xCommand Call Forward / Hold / Ignore / Join / Reject / Resume / UnattendedTransfer"
  params: []

- id: x_command_camera_position_reset
  label: "xCommand Camera PositionReset"
  kind: action
  command: "xCommand Camera PositionReset"
  params: []

- id: x_command_camera_position_set
  label: "xCommand Camera PositionSet"
  kind: action
  command: "xCommand Camera PositionSet"
  params: []

- id: x_command_camera_preset_activate
  label: "xCommand Camera Preset Activate"
  kind: action
  command: "xCommand Camera Preset Activate"
  params: []

- id: x_command_camera_preset_activate_default_position
  label: "xCommand Camera Preset ActivateDefaultPosition"
  kind: action
  command: "xCommand Camera Preset ActivateDefaultPosition"
  params: []

- id: x_command_camera_preset_edit_list_remove_show_store
  label: "xCommand Camera Preset Edit / List / Remove / Show / Store"
  kind: action
  command: "xCommand Camera Preset Edit / List / Remove / Show / Store"
  params: []

- id: x_command_camera_ramp
  label: "xCommand Camera Ramp"
  kind: action
  command: "xCommand Camera Ramp"
  params: []

- id: x_command_camera_trigger_autofocus
  label: "xCommand Camera TriggerAutofocus"
  kind: action
  command: "xCommand Camera TriggerAutofocus"
  params: []

- id: x_command_dial
  label: "xCommand Dial"
  kind: action
  command: "xCommand Dial"
  params: []

- id: x_command_gpio_manual_state_set
  label: "xCommand GPIO ManualState Set"
  kind: action
  command: "xCommand GPIO ManualState Set"
  params: []

- id: x_command_presentation_start
  label: "xCommand Presentation Start"
  kind: action
  command: "xCommand Presentation Start"
  params: []

- id: x_command_presentation_stop
  label: "xCommand Presentation Stop"
  kind: action
  command: "xCommand Presentation Stop"
  params: []

- id: x_command_standby_activate
  label: "xCommand Standby Activate"
  kind: action
  command: "xCommand Standby Activate"
  params: []

- id: x_command_standby_deactivate
  label: "xCommand Standby Deactivate"
  kind: action
  command: "xCommand Standby Deactivate"
  params: []

- id: x_command_standby_halfwake
  label: "xCommand Standby Halfwake"
  kind: action
  command: "xCommand Standby Halfwake"
  params: []

- id: x_command_standby_reset_halfwake_timer
  label: "xCommand Standby ResetHalfwakeTimer"
  kind: action
  command: "xCommand Standby ResetHalfwakeTimer"
  params: []

- id: x_command_standby_reset_timer
  label: "xCommand Standby ResetTimer"
  kind: action
  command: "xCommand Standby ResetTimer"
  params: []
```

## Feedbacks
```yaml

```

## Variables
```yaml
# Settable persistent parameters exposed via xConfiguration (survive reboot).
# Full valuespace via xConfiguration ?? ; current values via xConfiguration.
# Examples documented in source:
- id: network_services_ssh_mode
  path: "xConfiguration NetworkServices SSH Mode"
  type: enum
  values: [Off, On]
  default: On

- id: network_services_telnet_mode
  path: "xConfiguration NetworkServices Telnet Mode"
  type: enum
  values: [Off, On]
  default: Off

- id: network_services_http_mode
  path: "xConfiguration NetworkServices HTTP Mode"
  type: enum
  values: [Off, "HTTP+HTTPS", HTTPS]

- id: network_services_websocket
  path: "xConfiguration NetworkServices WebSocket"
  type: enum
  values: [Off, FollowHTTPService]

- id: serialport_mode
  path: "xConfiguration SerialPort Mode"
  type: enum
  values: [Off, On]
  default: On

- id: serialport_baudrate
  path: "xConfiguration SerialPort BaudRate"
  type: enum
  values: [9600, 19200, 38400, 57600, 115200]
  default: 38400  # SX10/SX80; SX20 default is 115200

- id: serialport_login_required
  path: "xConfiguration SerialPort LoginRequired"
  type: enum
  values: [Off, On]
  default: On

- id: preferences_outputmode
  path: "xPreferences outputmode"
  type: enum
  values: [terminal, xml, json]
  default: terminal
```

## Events
```yaml
# Unsolicited xEvent notifications; subscribe via xFeedback register /Event/<...>
# or via HTTP feedback slots. Result depends on device state at emission time.
- id: outgoing_call_indication
  path: "/Event/OutgoingCallIndication"
  fields: [CallId]

- id: call_disconnect
  path: "/Event/CallDisconnect"
  fields: [CallId, CauseValue, CauseString, CauseType, OrigCallDirection, RemoteURI, CauseCode, CauseOrigin]
  # CauseType value space: OtherLocal, LocalDisconnect, UnknownRemoteSite,
  # LocalBusy, LocalReject, InsufficientSecurity, OtherRemote, RemoteDisconnect,
  # RemoteBusy, RemoteRejected, RemoteNoAnswer, CallForwarded, NetworkRejected

- id: call_successful
  path: "/Event/CallSuccessful"
  fields: [CallId, Protocol, Direction, CallRate, RemoteURI, EncryptionIn, EncryptionOut]

- id: fecc_action_indication
  path: "/Event/FeccActionInd"
  fields: [Id, Req, Pan, PanRight, Tilt, TiltUp, Zoom, ZoomIn, Focus, FocusIn, Timeout, VideoSrc]

- id: tstring_message_received
  path: "/Event/TString"
  fields: [CallId, Message]

- id: sstring_message_received
  path: "/Event/SString"
  fields: [String, Id]
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequenced macros explicitly authored in source.
# Source documents xCommand Macros Macro Save/Activate/Rename for on-device
# JavaScript macros (out of scope for this control spec).
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "xCommand Audio Diagnostics AecReverb Reset is not allowed during a call."
warnings:
  - "Never register for all status feedback via 'xFeedback register /Status' - may overwhelm the control application and cause sluggish or unpredictable behavior."
  - "HTTP XMLAPI sessions are limited and do not time out automatically; explicitly close via POST /xmlapi/session/end when done or the device may run out of sessions."
  - "Serial baud rate change takes effect only after a device reboot."
  - "SX20 uses 38400 bps during initial boot sequence regardless of configured baud rate."
# UNRESOLVED: no explicit electrical/voltage interlocks or power-sequencing
# requirements stated in source.
```

## Notes
- **API surface**: Four hierarchical groups — `xCommand` (actions), `xConfiguration` (persistent settings), `xStatus` (current state), `xEvent` (notifications). Available commands vary by product, backend (on-prem/cloud), and user role (admin/audit/integrator/roomcontrol/user).
- **Case-insensitive**: All commands case-insensitive. `XCOMMAND DIAL`, `xcommand dial`, `xCommand Dial` all valid.
- **Value formats**: `<x..y>` integer range; `<X/Y/Z>` enum; `<S: x, y>` string with min/max length. Values containing spaces must be quoted.
- **Output modes**: terminal (default, line-based), XML, JSON. Set per-session via `xPreferences outputmode <mode>`.
- **Async API**: No guarantee responses arrive in command-issued order. Use `| resultId="tag"` for request/response matching (works with xcommand, xconfiguration, xstatus).
- **Multiline commands**: Payload after command line, terminated by `.` on its own line. Used for in-room control definitions, branding images (base64), macros, banners, certificates.
- **Searching**: `//` wildcard searches status/configuration hierarchy (e.g. `xconfiguration //out//hdmi`).
- **HTTP XMLAPI**: `GET /getxml?location=<path>` retrieves documents; `POST /putxml` (Content-Type: text/xml) sends commands/configs. `status.xml`, `configuration.xml`, `command.xml`, `valuespace.xml` return full documents.
- **Feedback limits**: 38 expressions per terminal session; 4 HTTP feedback slots × 15 expressions each. Feedback subscriptions are per-connection and must be re-registered after reconnect.
- **Telnet eligibility**: Telnet available only on DX, MX, and SX series.
- **Serial eligibility**: Serial API access not available on DX70, DX80, Room 55 Dual, Room 70 (does not affect SX Series).
- **User roles**: USER (basic), AUDIT (certificates), ROOMCONTROL (UI panels), ADMIN (full config), INTEGRATOR (AV integration). ADMIN role required for HTTP XMLAPI.

<!-- UNRESOLVED: exact SSH/Telnet/HTTP TCP port numbers not stated in source — only IP-address placeholders used throughout. -->
<!-- UNRESOLVED: firmware version compatibility ranges per model not stated; CE9.15 is the API guide document revision only. -->
<!-- UNRESOLVED: protocol version numbers for H.323/SIP not stated in this control-protocol section. -->
<!-- UNRESOLVED: binary/byte-level framing for RS-232 not specified (text-line based command interface implied by examples). -->
````

## Provenance

```yaml
source_domains:
  - cisco.com
source_urls:
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/ce915/collaboration-endpoint-software-api-reference-guide-ce915.pdf
retrieved_at: 2026-06-25T10:06:05.938Z
last_checked_at: 2026-06-25T15:31:42.365Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-25T15:31:42.365Z
matched_actions: 49
action_count: 49
confidence: medium
summary: "deterministic presence proof: 49/49 payloads verbatim in source; stratified Sonnet sample corroborated (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact TCP port numbers for SSH/Telnet/HTTP not stated in source (only IP-address placeholders shown)."
- "firmware version compatibility range across SX10/SX20/SX80 not separately stated; CE9.15 is the API guide revision."
- "port numbers (SSH/Telnet/HTTP) not stated in source"
- "only \"<ip-address>\" host placeholder stated; no path base documented beyond per-endpoint paths"
- "no multi-step sequenced macros explicitly authored in source."
- "no explicit electrical/voltage interlocks or power-sequencing"
- "exact SSH/Telnet/HTTP TCP port numbers not stated in source — only IP-address placeholders used throughout."
- "firmware version compatibility ranges per model not stated; CE9.15 is the API guide document revision only."
- "protocol version numbers for H.323/SIP not stated in this control-protocol section."
- "binary/byte-level framing for RS-232 not specified (text-line based command interface implied by examples)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
