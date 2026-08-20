---
spec_id: admin/aurora-dtx-amp-25-m
schema_version: ai4av-public-spec-v1
revision: 1
title: "Aurora DTX-AMP25-M Control Spec"
manufacturer: Aurora
model_family: DTX-AMP25-M
aliases: []
compatible_with:
  manufacturers:
    - Aurora
  models:
    - DTX-AMP25-M
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bzbexpress.com
  - manualslib.com
source_urls:
  - https://bzbexpress.com/wp-content/uploads/2026/06/aurora-multimedia-dtx-amp25-m-manual.pdf
  - https://www.manualslib.com/manual/3697363/Aurora-Dtx-Amp25-M.html
retrieved_at: 2026-07-31T22:26:52.832Z
last_checked_at: 2026-08-19T08:27:58.270Z
generated_at: 2026-08-19T08:27:58.270Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Power on/off control not present in source. No input/output routing commands documented. Voltage/current/power specs not in source."
  - "not stated in source"
  - "source shows only \"activated\" example; deactivated inferred."
  - "IP/mask/gateway configurable via !**NETWORK but no per-field query"
  - "source documents no unsolicited notifications."
  - "source documents no multi-step sequences."
  - "no explicit safety warnings, interlocks, or power-on sequencing"
  - "firmware version compatibility range not stated (only CR1_4_0 in example). Power on/off, mute/unmute, input gain/EQ not documented. RS-232 flow control not stated."
verification:
  verdict: verified
  checked_at: 2026-08-19T08:27:58.270Z
  matched_actions: 14
  action_count: 14
  confidence: medium
  summary: "All 14 spec action entries have literal command counterparts in the source RS-232 protocol table; transport 9600 8N1 is verbatim. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-01
---

# Aurora DTX-AMP25-M Control Spec

## Summary
Aurora DTX-AMP25-M Dante/AES67 audio amplifier with Line In. This spec covers RS-232 serial control: volume level, audio source select, network parameter setting, and a set of device status queries. RS-232 connector is a 3.81mm euro style block labelled TX, RX, GND.

<!-- UNRESOLVED: Power on/off control not present in source. No input/output routing commands documented. Voltage/current/power specs not in source. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  # flow_control: UNRESOLVED: not stated in source
auth:
  type: none  # inferred: no auth procedure in RS-232 protocol section of source
```

## Traits
```yaml
- levelable   # inferred from Set Volume Level command (!**VOLUMEx, 0-40)
- queryable   # inferred from multiple query commands returning device state
```

## Actions
```yaml
# Commands use ASCII with <cr> terminator. Query prefix "?", set prefix "!".
# Device ack prefixed "~". LITERAL "**" IS PAYLOAD: source shows "**" in both
# command strings AND device response strings (e.g. ~**VOLUME12<cr>). Responses
# carry no markdown → "**" = verbatim protocol token. Kept per population policy.
- id: query_volume
  label: Query Volume
  kind: query
  command: "?**VOLUME<cr>"
  params: []

- id: query_network_details
  label: Query Network Details
  kind: query
  command: "?**NETWORK<cr>"
  params: []

- id: query_serial_number
  label: Query Serial Number
  kind: query
  command: "?**SERIAL<cr>"
  params: []

- id: query_mac_address
  label: Query MAC Address
  kind: query
  command: "?**MAC<cr>"
  params: []

- id: query_audio_source
  label: Query Audio Source
  kind: query
  command: "?**AUDIO_SOURCE<cr>"
  params: []

- id: query_max_volume_level
  label: Query Max Volume Level
  kind: query
  command: "?**MAX_VOL_LEVEL<cr>"
  params: []

- id: query_serial_console_status
  label: Query Serial Console Status
  kind: query
  command: "?**SERIAL_CONSOLE<cr>"
  params: []

- id: query_device_model
  label: Query Device Model
  kind: query
  command: "?**DEV_MODEL<cr>"
  params: []

- id: query_firmware_version
  label: Query Firmware Version
  kind: query
  command: "?**VERSION<cr>"
  params: []

- id: query_dante_activation_status
  label: Query Dante Activation Status
  kind: query
  command: "?**DANTE_IS_ACTIVATED<cr>"
  params: []

- id: set_volume_level
  label: Set Volume Level
  kind: action
  command: "!**VOLUMEx<cr>"
  params:
    - name: x
      type: integer
      description: Volume level 0-40 (40 is maximum for DTX-AMP25-M)

- id: set_audio_source
  label: Set Audio Source
  kind: action
  command: "!**AUDIO_SOURCEx<cr>"
  params:
    - name: x
      type: string
      description: Audio source, "dante" or "linein"

- id: set_network_parameters
  label: Set Network Parameters
  kind: action
  command: "!**NETWORKo[,i,m,g]<cr>"
  params:
    - name: o
      type: string
      description: IP address mode, "dhcp" or "static"
    - name: i
      type: string
      required: false
      description: IP address (required only for static mode)
    - name: m
      type: string
      required: false
      description: Subnet mask (required only for static mode)
    - name: g
      type: string
      required: false
      description: Gateway (required only for static mode)

- id: set_debug_serial_console
  label: Set Debug Serial Console
  kind: action
  command: "!**SERIAL_CONSOLEx<cr>"
  params:
    - name: x
      type: string
      description: Console enable, "on" or "off"
```

## Feedbacks
```yaml
# Ack responses echoed by device with "~**" prefix and "<cr>" terminator.
- id: volume_echo
  type: string
  format: "~**VOLUMEx<cr>"
  description: Echo of current/set volume level
  example: "~**VOLUME10<cr>"

- id: network_details_response
  type: string
  format: "~**NETWORK{mode},{ip},{mask},{gateway}<cr>"
  description: Network parameters
  example: "~**NETWORKdhcp,169.254.88.1,255.255.0.0,0.0.0.0<cr>"

- id: serial_number_response
  type: string
  format: "~**SERIAL{serial}<cr>"
  description: Unit serial number
  example: "~**SERIAL12341234<cr>"

- id: mac_address_response
  type: string
  format: "~**MAC{mac}<cr>"
  description: MAC address
  example: "~**MAC00:de:ad:be:ef:00"

- id: audio_source_response
  type: enum
  values: [dante, linein]
  format: "~**AUDIO_SOURCE{source}<cr>"
  example: "~**AUDIO_SOURCEdante<cr>"

- id: max_volume_level_response
  type: integer
  format: "~**MAX_VOL_LEVEL{level}<cr>"
  description: Maximum is 40 for DTX-AMP25-M
  example: "~**MAX_VOL_LEVEL40<cr>"

- id: serial_console_status_response
  type: enum
  values: [on, off]
  format: "~**SERIAL_CONSOLE{state}<cr>"
  example: "~**SERIAL_CONSOLEon<cr>"

- id: device_model_response
  type: string
  format: "~**DEV_MODEL{model}<cr>"
  example: "~**DEV_MODELDTXAMP-25<cr>"

- id: firmware_version_response
  type: string
  format: "~**VERSION{version}<cr>"
  example: "~**VERSIONCR1_4_0<cr>"

- id: dante_activation_status_response
  type: enum
  values: [activated, deactivated]
  format: "~**DANTE_IS_ACTIVATED{state}<cr>"
  example: "~**DANTE_IS_ACTIVATEDactivated<cr>"
  # UNRESOLVED: source shows only "activated" example; deactivated inferred.
```

## Variables
```yaml
- id: volume_level
  type: integer
  min: 0
  max: 40
  description: Current volume level (0-40; 40 is hardware maximum for DTX-AMP25-M)

- id: audio_source
  type: enum
  values: [dante, linein]
  description: Selected audio source

- id: ip_mode
  type: enum
  values: [dhcp, static]
  description: LAN IP addressing mode

# UNRESOLVED: IP/mask/gateway configurable via !**NETWORK but no per-field query
# beyond combined ?**NETWORK response.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlocks, or power-on sequencing
# in source. !**NETWORK can disrupt connectivity; source does not flag as interlock.
```

## Notes
- RS-232 connector is a 3.81mm euro style block labelled TX, RX, GND.
- Protocol section explicitly states "All commands are sent at 9600 baud 8N1". General unit defaults (115K baud, auto IP) noted elsewhere do not apply to RS-232 command channel.
- Web Setup page at `http://<ip>/setup` = HTTP management interface (volume, IP, Dante stream, audio source), default user/pass "admin". Distinct from RS-232 control; NOT covered here.
- "?**DANTE_IS_ACTIVATER" in source Query Dante Activation row = typo for `?**DANTE_IS_ACTIVATED` (per header + response).
- Literal `**` retained verbatim in every command/response. Source documents `**` inside device response strings (e.g. `Response: ~**VOLUME12<cr>`) — hardware responses carry no markdown, so `**` = protocol framing token, not bold markup. Unclosed `**` → framing byte. Driving device without `**` would likely fail command recognition. Kept verbatim; no normalization.

<!-- UNRESOLVED: firmware version compatibility range not stated (only CR1_4_0 in example). Power on/off, mute/unmute, input gain/EQ not documented. RS-232 flow control not stated. -->

## Provenance

```yaml
source_domains:
  - bzbexpress.com
  - manualslib.com
source_urls:
  - https://bzbexpress.com/wp-content/uploads/2026/06/aurora-multimedia-dtx-amp25-m-manual.pdf
  - https://www.manualslib.com/manual/3697363/Aurora-Dtx-Amp25-M.html
retrieved_at: 2026-07-31T22:26:52.832Z
last_checked_at: 2026-08-19T08:27:58.270Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T08:27:58.270Z
matched_actions: 14
action_count: 14
confidence: medium
summary: "All 14 spec action entries have literal command counterparts in the source RS-232 protocol table; transport 9600 8N1 is verbatim. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Power on/off control not present in source. No input/output routing commands documented. Voltage/current/power specs not in source."
- "not stated in source"
- "source shows only \"activated\" example; deactivated inferred."
- "IP/mask/gateway configurable via !**NETWORK but no per-field query"
- "source documents no unsolicited notifications."
- "source documents no multi-step sequences."
- "no explicit safety warnings, interlocks, or power-on sequencing"
- "firmware version compatibility range not stated (only CR1_4_0 in example). Power on/off, mute/unmute, input gain/EQ not documented. RS-232 flow control not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
