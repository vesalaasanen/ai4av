---
spec_id: admin/hdanywhere-lm1xxa0x-lm2xxaxx-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "HDANYWHERE LM1xxA0x LM2xxAxx Series Control Spec"
manufacturer: HDANYWHERE
model_family: LM1xxA0x
aliases: []
compatible_with:
  manufacturers:
    - HDANYWHERE
  models:
    - LM1xxA0x
    - LM2xxAxx
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cloud.hdanywhere.com
  - support.hdanywhere.com
  - docs.google.com
source_urls:
  - https://cloud.hdanywhere.com/docs/api/hda_api.pdf
  - https://support.hdanywhere.com/rs232-settings-for-mhub-2017-models/
  - https://docs.google.com/document/d/e/2PACX-1vRCNYIheN9g9cZNAQkGNLM9xP5CNlED0dZ-rrY2DB-wwqI_1gxEstEqE8z_fHvXZ_k92SHlRUxihupd/pub
  - https://support.hdanywhere.com/2014/09/mhub-rs232-control-information/
  - https://support.hdanywhere.com/hda-control-drivers/
retrieved_at: 2026-07-24T19:24:06.730Z
last_checked_at: 2026-09-11T22:16:46.713Z
generated_at: 2026-09-11T22:16:46.713Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "LM1xxA0x / LM2xxAxx are not listed in the Supported Systems table; applicability of the MHUB REST API to these specific older model families is not confirmed in source."
  - "API Prologue lists \"REST/HTTP/OAuth 2.0\" as protocols but no OAuth flow, token, login, or credential procedure is documented anywhere in the source. Auth marked as none per inference rule; OAuth may apply but is not specified."
  - "source documents RS232 settings configuration and RS232 passthrough via /api/command/rs232pass/ and /api/command/rs232config/, so RS232 exists as a downstream-facing transport on supported MHUB units. Whether LM1xx/LM2xx expose RS232 ports and which serial parameters apply is not stated in source."
  - "source does not document unsolicited notifications or push events from the device."
  - "source contains no explicit safety warnings, interlocks, or power-on sequencing requirements."
  - "source has no description of LM1xxA0x or LM2xxAxx specifically. Spec extracted from general MHUB API doc with all model-specific gaps marked."
verification:
  verdict: verified
  checked_at: 2026-09-11T22:16:46.713Z
  matched_actions: 39
  action_count: 39
  confidence: medium
  summary: "All 39 spec actions map to endpoints documented verbatim in the source; bidirectional coverage is complete and transport values are present. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# HDANYWHERE LM1xxA0x LM2xxAxx Series Control Spec

## Summary
Source covers the HDANYWHERE (HDA) MHUB REST/HTTP API for controlling HDA matrix systems. The LM1xxA0x and LM2xxAxx model series are not enumerated in the source's "Supported Systems" table; the API is documented for MHUB U, MHUB PRO, MHUB PRO 2.0, MHUB MAX, MHUB AUDIO, and uControl Zone Processor families. Coverage is included only at the protocol/transport level and for API endpoints that may apply to these older units if they run MHUB-OS 8.20+ with API 2.1 — this is UNRESOLVED in the source.

<!-- UNRESOLVED: LM1xxA0x / LM2xxAxx are not listed in the Supported Systems table; applicability of the MHUB REST API to these specific older model families is not confirmed in source. -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://devicehost/api/"
  port: 80
auth:
  type: none  # inferred: no auth procedure in source (protocol stated as REST/HTTP/OAuth 2.0 in prologue but no auth flow described in API body)
```

<!-- UNRESOLVED: API Prologue lists "REST/HTTP/OAuth 2.0" as protocols but no OAuth flow, token, login, or credential procedure is documented anywhere in the source. Auth marked as none per inference rule; OAuth may apply but is not specified. -->
<!-- UNRESOLVED: source documents RS232 settings configuration and RS232 passthrough via /api/command/rs232pass/ and /api/command/rs232config/, so RS232 exists as a downstream-facing transport on supported MHUB units. Whether LM1xx/LM2xx expose RS232 ports and which serial parameters apply is not stated in source. -->

## Traits
```yaml
- powerable   # inferred from /api/power/0/ and /api/power/1/ endpoints
- routable    # inferred from /api/control/switch/ and /api/control/switch/zone/ endpoints
- queryable   # inferred from /api/data/* status endpoints
- levelable   # inferred from /api/control/volume/, /api/control/volume/zone/, /api/control/group/volume/set/
```

## Actions
```yaml
# All actions enumerate distinct HTTP endpoints documented in source.
# Arguments shown as path-template segments where the source uses placeholders.

# --- Critical ---
- id: reboot_full
  label: Full Reboot / Power Cycle
  kind: action
  command: "GET http://devicehost/api/reboot/1/"
  params: []

- id: reboot_mhub_os
  label: Reboot MHUB-OS
  kind: action
  command: "GET http://devicehost/api/reboot/2/"
  params: []

- id: power_standby_on
  label: Standby On (Power Off)
  kind: action
  command: "GET http://devicehost/api/power/0/"
  params: []

- id: power_standby_off
  label: Standby Off (Power On)
  kind: action
  command: "GET http://devicehost/api/power/1/"
  params: []

- id: identify
  label: Identify (flash LEDs)
  kind: action
  command: "GET http://devicehost/api/identify/"
  params: []

# --- Data queries ---
- id: query_power_state
  label: Query MHUB Power State
  kind: query
  command: "GET http://devicehost/api/data/0/"
  params: []

- id: query_system_info_standalone
  label: Query System Info (Standalone)
  kind: query
  command: "GET http://devicehost/api/data/100/"
  params: []

- id: query_system_info_stacked
  label: Query System Info (Stacked)
  kind: query
  command: "GET http://devicehost/api/data/101/"
  params: []

- id: query_zones
  label: Query MHUB Zones
  kind: query
  command: "GET http://devicehost/api/data/102/"
  params: []

- id: query_groups
  label: Query MHUB Groups
  kind: query
  command: "GET http://devicehost/api/data/103/"
  params: []

- id: query_status_single
  label: Query Status - Single System
  kind: query
  command: "GET http://devicehost/api/data/200/"
  params: []

- id: query_zone_status_single
  label: Query Zone Status - Single System
  kind: query
  command: "GET http://devicehost/api/data/200/{zid}"
  params:
    - name: zid
      type: string
      description: Zone ID (z1, z2, z3, ...)

- id: query_ucontrol_summary
  label: Query uControl Pack Summary
  kind: query
  command: "GET http://devicehost/api/data/201/"
  params: []

- id: query_ucontrol_pack
  label: Query uControl Pack Detail
  kind: query
  command: "GET http://devicehost/api/data/201/{x}"
  params:
    - name: x
      type: string
      description: IR port ID

- id: query_sequences
  label: Query Sequences
  kind: query
  command: "GET http://devicehost/api/data/202/"
  params: []

- id: query_status_stacked
  label: Query Status - Stacked MHUB
  kind: query
  command: "GET http://devicehost/api/data/203/"
  params: []

- id: query_zone_status_stacked
  label: Query Zone Status - Stacked MHUB
  kind: query
  command: "GET http://devicehost/api/data/203/{zid}"
  params:
    - name: zid
      type: string
      description: Zone ID (z1, z2, z3, ...)

# --- Operation ---
- id: switch_source
  label: Switch Source
  kind: action
  command: "GET http://devicehost/api/control/switch/{ox}/{iy}/"
  params:
    - name: ox
      type: string
      description: Output ID (a, b, c, ...)
    - name: iy
      type: integer
      description: Input ID (1, 2, 3, ...)

- id: switch_zone_audio
  label: Zone Switch (MHUB AUDIO only)
  kind: action
  command: "GET http://devicehost/api/control/switch/zone/{zid}/{iy}/"
  params:
    - name: zid
      type: string
      description: Zone ID (z1, z2, z3, ...)
    - name: iy
      type: integer
      description: Input ID (1, 2, 3, ...)

- id: fix_audio
  label: Source Audio Extraction (audiomatch)
  kind: action
  command: "GET http://devicehost/api/control/fixaudio/{ax}/"
  params:
    - name: ax
      type: boolean
      description: Enable audiomatch (true) or disable (false)

- id: set_output_volume
  label: Set Output Volume
  kind: action
  command: "GET http://devicehost/api/control/volume/{ox}/{vy}/"
  params:
    - name: ox
      type: string
      description: Output ID (a, b, c, ...)
    - name: vy
      type: integer
      description: Volume (1-100)

- id: set_zone_volume
  label: Set Zone Volume (MHUB AUDIO only)
  kind: action
  command: "GET http://devicehost/api/control/volume/zone/{zid}/{x}"
  params:
    - name: zid
      type: string
      description: Zone ID (z1, z2, z3, ...)
    - name: x
      type: integer
      description: Volume (0-100)

- id: set_arc
  label: Audio Return Channel (ARC)
  kind: action
  command: "GET http://devicehost/api/control/arc/{ox}/{ty}/{ax}/"
  params:
    - name: ox
      type: string
      description: Output ID (a, b, c)
    - name: ty
      type: integer
      description: Type (0=HDMI, 1=HDBaseT)
    - name: ax
      type: boolean
      description: ARC state (true=On, false=Off)

- id: mute_output
  label: Mute Output
  kind: action
  command: "GET http://devicehost/api/control/mute/{ox}/{mx}/"
  params:
    - name: ox
      type: string
      description: Output ID (a, b, c, ...)
    - name: mx
      type: boolean
      description: Mute state (true=enabled, false=disabled)

- id: mute_zone
  label: Mute Zone (MHUB AUDIO only)
  kind: action
  command: "GET http://devicehost/api/control/mute/zone/{zid}/{mx}/"
  params:
    - name: zid
      type: string
      description: Zone ID (z1, z2, z3, ...)
    - name: mx
      type: boolean
      description: Mute state (true=enabled, false=disabled)

- id: group_create
  label: Create Group
  kind: action
  command: "GET http://devicehost/api/control/group/create/{groupLabel}/"
  params:
    - name: groupLabel
      type: string
      description: Group label

- id: group_delete
  label: Delete Group
  kind: action
  command: "GET http://devicehost/api/control/group/delete/{gid}/"
  params:
    - name: gid
      type: string
      description: Group ID

- id: group_add_zones
  label: Add Zones to Group
  kind: action
  command: "POST http://devicehost/api/control/group/{gid}/add"
  params:
    - name: gid
      type: string
      description: Group ID
    - name: body
      type: json
      description: 'JSON body: {"zones": ["zone id", "zone id"]}'

- id: group_remove_zones
  label: Remove Zones from Group
  kind: action
  command: "POST http://devicehost/api/control/group/{gid}/delete"
  params:
    - name: gid
      type: string
      description: Group ID
    - name: body
      type: json
      description: 'JSON body: {"zones": ["zone id", "zone id"]}'

- id: group_set_volume
  label: Set Group Volume
  kind: action
  command: "GET http://devicehost/api/control/group/volume/set/{gid}/{vs}/"
  params:
    - name: gid
      type: string
      description: Group ID
    - name: vs
      type: integer
      description: Volume (1-100)

- id: mute_group
  label: Mute Group
  kind: action
  command: "GET http://devicehost/api/control/mutegroup/{gid}/{ox}/"
  params:
    - name: gid
      type: string
      description: Group ID
    - name: ox
      type: boolean
      description: Mute state (true=muted, false=unmuted)

- id: execute_sequence
  label: Execute Sequence
  kind: action
  command: "GET http://devicehost/api/control/sequence/{sid}/"
  params:
    - name: sid
      type: string
      description: Sequence ID

# --- IO ---
- id: ir_ucontrol_command
  label: Execute uControl IR Command
  kind: action
  command: "GET http://devicehost/api/command/ir/{io}/{cy}"
  params:
    - name: io
      type: integer
      description: IR port ID (1, 2, 3, ...)
    - name: cy
      type: integer
      description: IR command ID

- id: ir_passthrough
  label: IR Passthrough (Pronto hex)
  kind: action
  command: "POST http://devicehost/api/command/irpass/{io}/"
  params:
    - name: io
      type: integer
      description: IR port ID
    - name: body
      type: json
      description: 'JSON body: {"irdata": "0000,0072,0000,..."} (comma- or space-separated Pronto hex)'

- id: cec_ucontrol_command
  label: Execute uControl CEC Command
  kind: action
  command: "GET http://devicehost/api/command/cec/{io}/{ty}/{cy}/"
  params:
    - name: io
      type: string
      description: Port ID (a, b, c)
    - name: ty
      type: integer
      description: CEC command type (0=HDMI output, 1=HDBT output)
    - name: cy
      type: integer
      description: CEC command ID

- id: cec_passthrough
  label: CEC Passthrough
  kind: action
  command: "POST http://devicehost/api/command/cecpass/{io}/{ty}/"
  params:
    - name: io
      type: string
      description: Port ID
    - name: ty
      type: integer
      description: CEC command type (0=HDMI output, 1=HDBT output)
    - name: body
      type: json
      description: 'JSON body: {"logicaladdress": "EF", "command": "82", "arguments": "10 00"}'

- id: rs232_config
  label: RS232 Port Configuration
  kind: action
  command: "POST http://devicehost/api/command/rs232config/{pt}/"
  params:
    - name: pt
      type: integer
      description: RS232 port (1-8 on mhub, 9-16 on HDBT receivers, 17=all ports)
    - name: body
      type: json
      description: 'JSON body: {"rs232config": {"baud": "1", "data": "1", "parity": "1"}} - baud 1=115200,2=57600,3=56000,4=38400,5=19200,6=14400,7=9600,8=4800; data 1=8,2=7,3=6,4=5; parity 1=none,2=odd,3=even'

- id: rs232_passthrough_ascii
  label: RS232 Passthrough (ASCII)
  kind: action
  command: "POST http://devicehost/api/command/rs232pass/{io}/0/"
  params:
    - name: io
      type: integer
      description: RS232 port ID
    - name: body
      type: json
      description: 'JSON body: {"rs232data": "pwon!"}'

- id: rs232_passthrough_hex
  label: RS232 Passthrough (Hex)
  kind: action
  command: "POST http://devicehost/api/command/rs232pass/{io}/1/"
  params:
    - name: io
      type: integer
      description: RS232 port ID
    - name: body
      type: json
      description: 'JSON body: {"rs232data": "A55B0110FF"}'
```

## Feedbacks
```yaml
- id: power_state
  type: boolean
  description: MHUB power state (true=on, false=off). From /api/data/0/
- id: zone_routing
  type: object
  description: Per-zone routing, volume, mute, ARC, display power. From /api/data/200/, /api/data/200/{zid}
- id: group_volume
  type: integer
  description: Average group volume (0-100). From /api/data/103/
- id: group_mute
  type: boolean
  description: Group mute state. From /api/data/103/
- id: zone_audio_volume
  type: integer
  description: Per-zone audio volume (0-100). From /api/data/200/{zid}
- id: zone_mute
  type: boolean
  description: Per-zone mute state. From /api/data/200/{zid}
- id: arc_state
  type: boolean
  description: ARC state for output. From /api/data/200/{zid}
- id: display_power
  type: string
  description: Display power state (true/false/unknown). From /api/data/200/{zid}
- id: first_boot
  type: boolean
  description: First boot completed. From /api/data/100/
- id: ucontrol_pack_info
  type: object
  description: uControl pack name, type, version, IR commands list. From /api/data/201/{x}
```

## Variables
```yaml
# No standalone settable variables beyond actions; volume and mute are exposed via actions/feedbacks.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications or push events from the device.
```

## Macros
```yaml
# Source references /api/data/202/ Sequences and /api/control/sequence/{sid}/ execution, but sequence
# definitions (multi-step contents) are stored on-device and not enumerated in this source.
# Treat as opaque handle: trigger stored sequence by ID.
- id: execute_sequence
  description: Trigger a user-defined on-device Sequence by its ID.
  command: "GET http://devicehost/api/control/sequence/{sid}/"
  params:
    - name: sid
      type: string
      description: Sequence ID (returned from /api/data/202/)
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or power-on sequencing requirements.
```

## Notes
- Source document is the HDANYWHERE (HDA) MHUB REST API specification, API version 2.1, applicable to MHUB-OS 8.20+ / FW 2.0+. The target LM1xxA0x and LM2xxAxx model series are NOT enumerated in the source's "Supported Systems" table; applicability of this API to those specific older matrix units is UNRESOLVED.
- All API resources are served from the base URL `http://devicehost/api/`. `devicehost` resolves via mDNS (DNS-SD) to `MHUB431U.local`, `MHUB862U.local`, etc. — none of the LM1xxA0x/LM2xxAxx hostnames appear in the DNS-SD responses table.
- Source explicitly states power control is "not universally supported on every system" — confirm per-unit.
- /api/data/100/ response includes `first_boot` flag indicating first-boot state and reports IO connectivity including RS232 and CEC ports.
- /api/command/rs232config/ exposes RS232 baud (115200 down to 4800), data length (5-8), and parity (none/odd/even). It is an HDA-side configuration of downstream RS232 ports, not a serial transport for the MHUB itself.
- /api/command/rs232pass/ is a passthrough tunnel; it does not define RS232 protocol but allows forwarding ASCII or hex commands to attached devices (e.g., displays, sources). Documented examples: ASCII `pwon!`, HEX `a55b0110ff`.
- IR command IDs 0-59 map to common remote buttons (Power, Volume, Channel, Transport, Navigation, Color keys, etc.) — see /api/data/201/{x} for uControl pack command definitions.
- IR ports: backwards (chassis), forwards (display receivers), and AVR ports use numeric IDs starting at 1; AVR port ID is always +1 after the last forwards ID. AVR ports do not apply to LM1xx/LM2xx per source if those units lack AVR capability.
- Source explicitly notes CEC is non-standard across manufacturers and HDANYWHERE cannot guarantee command support.
- HDA Cloud references section states development is paused; cloud-side features not documented further.

<!-- UNRESOLVED: source has no description of LM1xxA0x or LM2xxAxx specifically. Spec extracted from general MHUB API doc with all model-specific gaps marked. -->

## Provenance

```yaml
source_domains:
  - cloud.hdanywhere.com
  - support.hdanywhere.com
  - docs.google.com
source_urls:
  - https://cloud.hdanywhere.com/docs/api/hda_api.pdf
  - https://support.hdanywhere.com/rs232-settings-for-mhub-2017-models/
  - https://docs.google.com/document/d/e/2PACX-1vRCNYIheN9g9cZNAQkGNLM9xP5CNlED0dZ-rrY2DB-wwqI_1gxEstEqE8z_fHvXZ_k92SHlRUxihupd/pub
  - https://support.hdanywhere.com/2014/09/mhub-rs232-control-information/
  - https://support.hdanywhere.com/hda-control-drivers/
retrieved_at: 2026-07-24T19:24:06.730Z
last_checked_at: 2026-09-11T22:16:46.713Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-11T22:16:46.713Z
matched_actions: 39
action_count: 39
confidence: medium
summary: "All 39 spec actions map to endpoints documented verbatim in the source; bidirectional coverage is complete and transport values are present. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "LM1xxA0x / LM2xxAxx are not listed in the Supported Systems table; applicability of the MHUB REST API to these specific older model families is not confirmed in source."
- "API Prologue lists \"REST/HTTP/OAuth 2.0\" as protocols but no OAuth flow, token, login, or credential procedure is documented anywhere in the source. Auth marked as none per inference rule; OAuth may apply but is not specified."
- "source documents RS232 settings configuration and RS232 passthrough via /api/command/rs232pass/ and /api/command/rs232config/, so RS232 exists as a downstream-facing transport on supported MHUB units. Whether LM1xx/LM2xx expose RS232 ports and which serial parameters apply is not stated in source."
- "source does not document unsolicited notifications or push events from the device."
- "source contains no explicit safety warnings, interlocks, or power-on sequencing requirements."
- "source has no description of LM1xxA0x or LM2xxAxx specifically. Spec extracted from general MHUB API doc with all model-specific gaps marked."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
