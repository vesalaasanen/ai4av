---
spec_id: admin/sony-kdlw900-series
schema_version: ai4av-public-spec-v1
revision: 2
title: "Sony KDLW900 Series Control Spec"
manufacturer: Sony
model_family: "Sony KDLW900 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "Sony KDLW900 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net
retrieved_at: 2026-07-21T23:09:36.545Z
last_checked_at: 2026-07-22T01:23:52.660Z
generated_at: 2026-07-22T01:23:52.660Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Wake-on-LAN behavior details, REST API `setPowerStatus` / `getRemoteControllerInfo` payloads, and firmware compatibility for suspend recovery are not fully specified in the source."
  - "PSK value is configured per-display by the operator; the source only demonstrates \"1234\" as an example."
  - "IRCC-IP source does not document observable power/input/volume state values."
  - "no settable parameters described as discrete values in the source."
  - "source does not document unsolicited notifications from the device."
  - "source does not document explicit multi-step sequences beyond the"
  - "detailed fault / error behavior and recovery sequences beyond"
  - "full SOAP envelope body template, REST API `setPowerStatus` / `getRemoteControllerInfo` payloads, and firmware-specific behavior changes are not stated in the source."
verification:
  verdict: verified
  checked_at: 2026-07-22T01:23:52.660Z
  matched_actions: 47
  action_count: 47
  confidence: medium
  summary: "All 47 spec actions matched exactly in source: 46 IRCC codes from the command table plus getSystemInformation JSON-RPC. Transport parameters verified. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-09
---

# Sony KDLW900 Series Control Spec

## Summary
This spec covers the Sony KDLW900 Series BRAVIA Professional Displays, which expose an IP-based control interface called IRCC-IP. IRCC-IP sends SOAP-over-HTTP POST requests to a fixed endpoint to emulate infrared remote control operations such as power, input switching, volume, and navigation. Authentication uses a Pre-Shared Key supplied via the `X-Auth-PSK` HTTP header. A companion JSON-RPC REST endpoint at `POST /sony/system` is documented for system queries (e.g. `getSystemInformation` for MAC retrieval) and suspend-state recovery.

<!-- UNRESOLVED: Wake-on-LAN behavior details, REST API `setPowerStatus` / `getRemoteControllerInfo` payloads, and firmware compatibility for suspend recovery are not fully specified in the source. -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://{ip}/sony/ircc"
  port: 80  # stated: "Host: 192.168.1.100:80" in source request example
auth:
  type: pre_shared_key
  header: X-Auth-PSK
  # UNRESOLVED: PSK value is configured per-display by the operator; the source only demonstrates "1234" as an example.
```

## Traits
```yaml
powerable: true   # inferred from Power IRCC code
routable: true    # inferred from Hdmi1-Hdmi4 and Input IRCC codes
queryable: true   # inferred from getSystemInformation query in source
levelable: true   # inferred from VolumeUp / VolumeDown / Mute IRCC codes
```

## Actions
```yaml
# IRCC-IP remote-control codes. Each `command:` holds the Base64 IRCC code
# placed verbatim in the SOAP body (urn:schemas-sony-com:service:IRCC:1#X_SendIRCC)
# sent to POST /sony/ircc.
- id: power
  label: Power
  kind: action
  command: "AAAAAQAAAAEAAAAVAw=="
  params: []
- id: input
  label: Input
  kind: action
  command: "AAAAAQAAAAEAAAAlAw=="
  params: []
- id: sync_menu
  label: SyncMenu
  kind: action
  command: "AAAAAgAAABoAAABYAw=="
  params: []
- id: hdmi1
  label: Hdmi1
  kind: action
  command: "AAAAAgAAABoAAABaAw=="
  params: []
- id: hdmi2
  label: Hdmi2
  kind: action
  command: "AAAAAgAAABoAAABbAw=="
  params: []
- id: hdmi3
  label: Hdmi3
  kind: action
  command: "AAAAAgAAABoAAABcAw=="
  params: []
- id: hdmi4
  label: Hdmi4
  kind: action
  command: "AAAAAgAAABoAAABdAw=="
  params: []
- id: num1
  label: Num1
  kind: action
  command: "AAAAAQAAAAEAAAAAAw=="
  params: []
- id: num2
  label: Num2
  kind: action
  command: "AAAAAQAAAAEAAAABAw=="
  params: []
- id: num3
  label: Num3
  kind: action
  command: "AAAAAQAAAAEAAAACAw=="
  params: []
- id: num4
  label: Num4
  kind: action
  command: "AAAAAQAAAAEAAAADAw=="
  params: []
- id: num5
  label: Num5
  kind: action
  command: "AAAAAQAAAAEAAAAEAw=="
  params: []
- id: num6
  label: Num6
  kind: action
  command: "AAAAAQAAAAEAAAAFAw=="
  params: []
- id: num7
  label: Num7
  kind: action
  command: "AAAAAQAAAAEAAAAGAw=="
  params: []
- id: num8
  label: Num8
  kind: action
  command: "AAAAAQAAAAEAAAAHAw=="
  params: []
- id: num9
  label: Num9
  kind: action
  command: "AAAAAQAAAAEAAAAIAw=="
  params: []
- id: num0
  label: Num0
  kind: action
  command: "AAAAAQAAAAEAAAAJAw=="
  params: []
- id: dot
  label: Dot(.)
  kind: action
  command: "AAAAAgAAAJcAAAAdAw=="
  params: []
- id: cc
  label: CC
  kind: action
  command: "AAAAAgAAAJcAAAAoAw=="
  params: []
- id: red
  label: Red
  kind: action
  command: "AAAAAgAAAJcAAAAlAw=="
  params: []
- id: green
  label: Green
  kind: action
  command: "AAAAAgAAAJcAAAAmAw=="
  params: []
- id: yellow
  label: Yellow
  kind: action
  command: "AAAAAgAAAJcAAAAnAw=="
  params: []
- id: blue
  label: Blue
  kind: action
  command: "AAAAAgAAAJcAAAAkAw=="
  params: []
- id: up
  label: Up
  kind: action
  command: "AAAAAQAAAAEAAAB0Aw=="
  params: []
- id: down
  label: Down
  kind: action
  command: "AAAAAQAAAAEAAAB1Aw=="
  params: []
- id: right
  label: Right
  kind: action
  command: "AAAAAQAAAAEAAAAzAw=="
  params: []
- id: left
  label: Left
  kind: action
  command: "AAAAAQAAAAEAAAA0Aw=="
  params: []
- id: confirm
  label: Confirm
  kind: action
  command: "AAAAAQAAAAEAAABlAw=="
  params: []
- id: help
  label: Help
  kind: action
  command: "AAAAAgAAAMQAAABNAw=="
  params: []
- id: display
  label: Display
  kind: action
  command: "AAAAAQAAAAEAAAA6Aw=="
  params: []
- id: options
  label: Options
  kind: action
  command: "AAAAAgAAAJcAAAA2Aw=="
  params: []
- id: back
  label: Back
  kind: action
  command: "AAAAAgAAAJcAAAAjAw=="
  params: []
- id: home
  label: Home
  kind: action
  command: "AAAAAQAAAAEAAABgAw=="
  params: []
- id: volume_up
  label: VolumeUp
  kind: action
  command: "AAAAAQAAAAEAAAASAw=="
  params: []
- id: volume_down
  label: VolumeDown
  kind: action
  command: "AAAAAQAAAAEAAAATAw=="
  params: []
- id: mute
  label: Mute
  kind: action
  command: "AAAAAQAAAAEAAAAUAw=="
  params: []
- id: audio
  label: Audio
  kind: action
  command: "AAAAAQAAAAEAAAAXAw=="
  params: []
- id: channel_up
  label: ChannelUp
  kind: action
  command: "AAAAAQAAAAEAAAAQAw=="
  params: []
- id: channel_down
  label: ChannelDown
  kind: action
  command: "AAAAAQAAAAEAAAARAw=="
  params: []
- id: play
  label: Play
  kind: action
  command: "AAAAAgAAAJcAAAAaAw=="
  params: []
- id: pause
  label: Pause
  kind: action
  command: "AAAAAgAAAJcAAAAZAw=="
  params: []
- id: stop
  label: Stop
  kind: action
  command: "AAAAAgAAAJcAAAAYAw=="
  params: []
- id: flash_plus
  label: FlashPlus
  kind: action
  command: "AAAAAgAAAJcAAAB4Aw=="
  params: []
- id: flash_minus
  label: FlashMinus
  kind: action
  command: "AAAAAgAAAJcAAAB5Aw=="
  params: []
- id: prev
  label: Prev
  kind: action
  command: "AAAAAgAAAJcAAAA8Aw=="
  params: []
- id: next
  label: Next
  kind: action
  command: "AAAAAgAAAJcAAAA9Aw=="
  params: []
# Companion REST API (JSON-RPC over HTTP) at POST /sony/system.
- id: get_system_information
  label: Get System Information
  kind: query
  endpoint: "POST /sony/system"
  command: '{"method": "getSystemInformation", "params": [], "id": 1, "version": "1.0"}'
  params: []
```

## Feedbacks
```yaml
- id: mac_address
  type: string
  source: getSystemInformation response (result[].macAddr)
  description: Monitor MAC address, e.g. "00:11:22:33:44:55"
# UNRESOLVED: IRCC-IP source does not document observable power/input/volume state values.
```

## Variables
```yaml
# UNRESOLVED: no settable parameters described as discrete values in the source.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications from the device.
```

## Macros
```yaml
# UNRESOLVED: source does not document explicit multi-step sequences beyond the
# suspend-recovery procedure (see Safety).
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source documents suspend-state recovery via Wake-on-LAN: if the monitor is
# suspended, the HTTP server stops and IRCC-IP is unavailable; operator must
# enable WoL and send UDP magic packets ("FF FF FF FF FF FF" + MAC x16) to UDP
# port 9 or 7 to the broadcast address. After power-on in "Normal Mode", the
# screen must be switched to display mode using "setPowerStatus"; in "Pro Mode"
# the screen turns ON automatically.
# UNRESOLVED: detailed fault / error behavior and recovery sequences beyond
# suspend are not stated in source; setPowerStatus payload not documented.
```

## Notes
The IRCC-IP endpoint is fixed at `POST /sony/ircc` and the SOAP action used is `urn:schemas-sony-com:service:IRCC:1#X_SendIRCC`. The Base64 IRCC codes listed in the source are placed inside the SOAP XML body as the IRCC code value. Pre-Shared Key is mandatory and must match the value configured on the display (sent via the `X-Auth-PSK` header on every request). The companion REST API at `POST /sony/system` exposes `getSystemInformation` (full payload documented) for MAC retrieval and suspend recovery; `getRemoteControllerInfo` and `setPowerStatus` are referenced in the source but their request payloads are not documented here.

<!-- UNRESOLVED: full SOAP envelope body template, REST API `setPowerStatus` / `getRemoteControllerInfo` payloads, and firmware-specific behavior changes are not stated in the source. -->
````

**Changes made:**
- Fixed 21 IRCC byte errors (`AAAAAQ`→`AAAAAg`, byte `0x01`→`0x02`) across SyncMenu/Hdmi1-4/Dot/CC/Red/Green/Yellow/Blue/Help/Options/Back/Play/Pause/Stop/FlashPlus/FlashMinus/Prev/Next.
- Added `get_system_information` query action (documented JSON-RPC payload) → flipped `queryable: true`.
- Added `mac_address` feedback from documented response.
- Revision 1→2, Summary/Notes/Safety updated. Existing IDs + shapes preserved.

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net
retrieved_at: 2026-07-21T23:09:36.545Z
last_checked_at: 2026-07-22T01:23:52.660Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T01:23:52.660Z
matched_actions: 47
action_count: 47
confidence: medium
summary: "All 47 spec actions matched exactly in source: 46 IRCC codes from the command table plus getSystemInformation JSON-RPC. Transport parameters verified. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Wake-on-LAN behavior details, REST API `setPowerStatus` / `getRemoteControllerInfo` payloads, and firmware compatibility for suspend recovery are not fully specified in the source."
- "PSK value is configured per-display by the operator; the source only demonstrates \"1234\" as an example."
- "IRCC-IP source does not document observable power/input/volume state values."
- "no settable parameters described as discrete values in the source."
- "source does not document unsolicited notifications from the device."
- "source does not document explicit multi-step sequences beyond the"
- "detailed fault / error behavior and recovery sequences beyond"
- "full SOAP envelope body template, REST API `setPowerStatus` / `getRemoteControllerInfo` payloads, and firmware-specific behavior changes are not stated in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
