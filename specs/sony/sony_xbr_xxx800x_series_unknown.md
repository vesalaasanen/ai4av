---
spec_id: admin/sony-xbr-xxx800x-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony XBR-xxX800x Series Control Spec"
manufacturer: Sony
model_family: "Sony XBR-xxX800x Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "Sony XBR-xxX800x Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
  - pro.sony
  - files.remotecentral.com
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro.sony/s3/2018/07/19110602/Sony_Protocol-Manual_Supported-Command-List_1st-Edition-Revised-1.pdf
  - https://files.remotecentral.com/library/22-1/sony/index.html
  - https://pro.sony/s3/2018/07/19110324/Sony_Protocol-Manual_1st-Edition-Revised-1.pdf
  - https://files.remotecentral.com/library/22-1/sony/receiver/date.html
retrieved_at: 2026-06-18T08:42:36.115Z
last_checked_at: 2026-06-19T07:54:40.505Z
generated_at: 2026-06-19T07:54:40.505Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source documents Simple IP Control only; serial (RS-232) and REST/IRCC-IP control also exist for Pro BRAVIA family but are not covered by this refined source. Confirm whether XBR-xxX800x consumer variant fully inherits Pro BRAVIA Simple IP Control command set. EU RED-DA variants may alter available commands."
  - "source contains no safety warnings, interlock procedures, or"
  - "source documents Simple IP Control only. RS-232 serial control, REST API (JSON-RPC), and IRCC-IP (SOAP) interfaces exist for the broader Pro BRAVIA family but are out of scope for this refined source."
  - "XBR-xxX800x is a consumer TV line; this spec assumes it inherits the Pro BRAVIA Simple IP Control command set verbatim. Not confirmed against a Sony published X800x-specific document."
  - "maximum audio volume value (clipping ceiling) not stated in source."
  - "setInput index range documented as 1-9999 but actual number of HDMI/Component/Composite inputs on the XBR-xxX800x hardware not stated in this source."
  - "exact byte value to send for '#' padding bytes (ASCII 0x23 vs. 0x00 vs. 0x30) not explicitly defined in source; reproduced as documented."
  - "firmware version compatibility range not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-19T07:54:40.505Z
  matched_actions: 23
  action_count: 23
  confidence: medium
  summary: "All 23 spec actions match literal FourCC/command tokens in source. Transport (TCP/20060/no-auth) verified. Full bidirectional coverage: spec represents all 11 command families in the source. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-18
---

# Sony XBR-xxX800x Series Control Spec

## Summary
Sony BRAVIA Professional Display (XBR-xxX800x series) controlled via Simple IP Control — a TCP-based protocol (SSIP) using fixed-length 24-byte ASCII messages. Spec covers power, audio volume/mute, input routing, picture mute, scene setting, IR-key injection, and several status queries and unsolicited notify events. Listens on TCP port 20060 over LAN.

<!-- UNRESOLVED: source documents Simple IP Control only; serial (RS-232) and REST/IRCC-IP control also exist for Pro BRAVIA family but are not covered by this refined source. Confirm whether XBR-xxX800x consumer variant fully inherits Pro BRAVIA Simple IP Control command set. EU RED-DA variants may alter available commands. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none  # inferred: no auth/login procedure described in source
# Note: protocol uses fixed 24-byte ASCII message frames.
# Message layout (per source):
#   Byte 0-1   Header      0x2A 0x53 ("*S")
#   Byte 2     Msg Type    0x43 'C' Control, 0x45 'E' Enquiry, 0x41 'A' Answer, 0x4E 'N' Notify
#   Byte 3-6   Command     4-char Four-CC (e.g. POWR, VOLU, INPT)
#   Byte 7-22  Parameters  16 ASCII chars
#   Byte 23    Footer      0x0A (LF)
```

## Traits
```yaml
traits:
  - powerable    # inferred: setPowerStatus / togglePowerStatus commands present
  - queryable    # inferred: getPowerStatus / getAudioVolume / getInput etc. present
  - routable     # inferred: setInput selects HDMI/Composite/Component/Screen Mirroring
  - levelable    # inferred: setAudioVolume takes a numeric level
```

## Actions
```yaml
# Message Type 'C' = Control (client → monitor). Answer 'A' reply expected.
# Param bytes shown verbatim as in source. '#' = no-parameter padding byte;
# 'X' = placeholder the client must fill. Literal commands include header
# (*S), type char, fourCC, 16 param chars; LF footer (0x0A) omitted from
# display but REQUIRED on the wire.

# --- Power ---
- id: set_power_off
  label: Power Standby (Off)
  kind: action
  command: "*SCPOWR0000000000000000"
  params: []

- id: set_power_on
  label: Power Active (On)
  kind: action
  command: "*SCPOWR0000000000000001"
  params: []

- id: toggle_power
  label: Toggle Power
  kind: action
  command: "*SCTPOW################"
  params: []
  notes: "Source documents param bytes as '#' (no-parameter padding)."

# --- Volume ---
- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{level:016d}"
  params:
    - name: level
      type: integer
      description: "Volume level, decimal, left-zero-padded to fill 16 chars. Source example: 29 → '0000000000000029'. Max not stated."
  notes: "Source example payload: '*SCVOLU0000000000000029'"

# --- Audio Mute ---
- id: set_audio_mute_off
  label: Audio Unmute
  kind: action
  command: "*SCAMUT0000000000000000"
  params: []

- id: set_audio_mute_on
  label: Audio Mute
  kind: action
  command: "*SCAMUT0000000000000001"
  params: []

# --- Input Routing ---
# Param layout (bytes 7-22): byte 13 = input type (1/3/4/5), bytes 19-22 = index 1-9999 zero-padded.
- id: set_input_hdmi
  label: Select HDMI Input
  kind: action
  command: "*SCINPT000000010000XXXX"
  params:
    - name: index
      type: integer
      description: "HDMI input index, 1-9999, zero-padded 4 digits."

- id: set_input_composite
  label: Select Composite Input
  kind: action
  command: "*SCINPT000000030000XXXX"
  params:
    - name: index
      type: integer
      description: "Composite input index, 1-9999, zero-padded 4 digits."

- id: set_input_component
  label: Select Component Input
  kind: action
  command: "*SCINPT000000040000XXXX"
  params:
    - name: index
      type: integer
      description: "Component input index, 1-9999, zero-padded 4 digits."

- id: set_input_screen_mirroring
  label: Select Screen Mirroring Input
  kind: action
  command: "*SCINPT000000050000XXXX"
  params:
    - name: index
      type: integer
      description: "Screen Mirroring input index, 1-9999, zero-padded 4 digits."

# --- Picture Mute ---
- id: set_picture_mute_off
  label: Picture Mute Disable
  kind: action
  command: "*SCPMUT0000000000000000"
  params: []

- id: set_picture_mute_on
  label: Picture Mute Enable (Black Screen)
  kind: action
  command: "*SCPMUT0000000000000001"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################"
  params: []
  notes: "Source documents param bytes as '#' (no-parameter padding)."

# --- Scene Setting ---
- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{scene padded right with '#' to 16 chars}"
  params:
    - name: scene
      type: string
      description: "One of 'auto', 'auto24pSync', 'general'. Case-sensitive. Right-padded with '#' to 16 chars. Source example: 'auto24pSync#####'."
  notes: "Source example payload: '*SCSCENauto24pSync#####'"

# --- IR Remote Code Injection ---
# All 57 IR keys below are parameter values of the single setIrccCode opcode
# (FourCC 'IRCC'). Source documents them as rows in the IR Commands table;
# param bytes 7-22 carry the 16-char zero-padded decimal IR code.
- id: set_ircc_code
  label: Send IR Remote Code
  kind: action
  command: "*SCIRCC{code:016d}"
  params:
    - name: code
      type: integer
      description: "IR code, 16-char left-zero-padded decimal. Enumerated values (source IR Commands table):"
      enum:
        - { value: 5,     label: Display }
        - { value: 6,     label: Home }
        - { value: 7,     label: Options }
        - { value: 8,     label: Return }
        - { value: 9,     label: Up }
        - { value: 10,    label: Down }
        - { value: 11,    label: Right }
        - { value: 12,    label: Left }
        - { value: 13,    label: Confirm }
        - { value: 14,    label: Red }
        - { value: 15,    label: Green }
        - { value: 16,    label: Yellow }
        - { value: 17,    label: Blue }
        - { value: 18,    label: Num1 }
        - { value: 19,    label: Num2 }
        - { value: 20,    label: Num3 }
        - { value: 21,    label: Num4 }
        - { value: 22,    label: Num5 }
        - { value: 23,    label: Num6 }
        - { value: 24,    label: Num7 }
        - { value: 25,    label: Num8 }
        - { value: 26,    label: Num9 }
        - { value: 27,    label: Num0 }
        - { value: 30,    label: Volume Up }
        - { value: 31,    label: Volume Down }
        - { value: 32,    label: Mute }
        - { value: 33,    label: Channel Up }
        - { value: 34,    label: Channel Down }
        - { value: 35,    label: Subtitle }
        - { value: 38,    label: DOT }
        - { value: 50,    label: Picture Off }
        - { value: 61,    label: Wide }
        - { value: 62,    label: Jump }
        - { value: 76,    label: Sync Menu }
        - { value: 77,    label: Forward }
        - { value: 78,    label: Play }
        - { value: 79,    label: Rewind }
        - { value: 80,    label: Prev }
        - { value: 81,    label: Stop }
        - { value: 82,    label: Next }
        - { value: 84,    label: Pause }
        - { value: 86,    label: Flash Plus }
        - { value: 87,    label: Flash Minus }
        - { value: 98,    label: TV Power }
        - { value: 99,    label: Audio }
        - { value: 101,   label: Input }
        - { value: 104,   label: Sleep }
        - { value: 105,   label: Sleep Timer }
        - { value: 108,   label: Video 2 }
        - { value: 110,   label: Picture Mode }
        - { value: 121,   label: Demo Surround }
        - { value: 124,   label: HDMI 1 }
        - { value: 125,   label: HDMI 2 }
        - { value: 126,   label: HDMI 3 }
        - { value: 127,   label: HDMI 4 }
        - { value: 129,   label: Action Menu }
        - { value: 130,   label: Help }

# --- Enquiries (Message Type 'E') ---
- id: get_power_status
  label: Power Status Query
  kind: query
  command: "*SEPOWR################"
  params: []
  notes: "Source documents enquiry param bytes as '#'. Reply 'A' returns POWR 0 (off) or 1 (on)."

- id: get_audio_volume
  label: Audio Volume Query
  kind: query
  command: "*SEVOLU################"
  params: []
  notes: "Reply 'A' returns 16-char decimal volume value in param bytes."

- id: get_audio_mute
  label: Audio Mute Query
  kind: query
  command: "*SEAMUT################"
  params: []
  notes: "Reply 'A' returns 0 (not muted) or 1 (muted)."

- id: get_input
  label: Current Input Query
  kind: query
  command: "*SEINPT################"
  params: []
  notes: "Reply 'A' returns input-type byte (1/3/4/5) + index 1-9999."

- id: get_picture_mute
  label: Picture Mute Query
  kind: query
  command: "*SEPMUT################"
  params: []
  notes: "Reply 'A' returns 0 (off) or 1 (on)."

- id: get_scene_setting
  label: Scene Setting Query
  kind: query
  command: "*SESCEN################"
  params: []
  notes: "Reply 'A' returns current scene string padded right with '#'."

- id: get_broadcast_address
  label: Broadcast IPv4 Address Query
  kind: query
  command: "*SEBADReth0#############"
  params:
    - name: interface
      type: string
      description: "Interface identifier; source example uses 'eth0' (bytes 7-10). Remaining bytes padded with '#'."
  notes: "Reply 'A' returns broadcast IPv4 address padded right with '#'. EU models: see RED-DA note."

- id: get_mac_address
  label: MAC Address Query
  kind: query
  command: "*SEMADReth0#############"
  params:
    - name: interface
      type: string
      description: "Interface identifier; source example uses 'eth0' (bytes 7-10). Remaining bytes padded with '#'."
  notes: "Reply 'A' returns MAC address padded right with '#'. EU models: see RED-DA note."
```

## Feedbacks
```yaml
# Answer (A) replies to Control/Enquiry. All carry FourCC of originating command.
- id: power_state
  type: enum
  values: [off, on]
  source_reply_examples:
    - "*SAPOWR0000000000000000"   # standby/off
    - "*SAPOWR0000000000000001"   # active/on
- id: audio_volume_level
  type: integer
  source_reply_example: "*SAVOLU0000000000000029"   # volume 29
- id: audio_mute_state
  type: enum
  values: [unmuted, muted]
- id: input_source
  type: composite
  description: "Input type byte (1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring) + index 1-9999."
- id: picture_mute_state
  type: enum
  values: [off, on]
- id: scene_setting_value
  type: string
  description: "Scene name padded right with '#'."
- id: broadcast_address
  type: string
  description: "IPv4 broadcast address padded right with '#'."
- id: mac_address
  type: string
  description: "MAC address padded right with '#'."
- id: command_ack_success
  type: literal
  description: "Generic success ack - 16-char params all '0'."
  source_example: "*SA{fourcc}0000000000000000"
- id: command_ack_error
  type: literal
  description: "Generic error ack - 16-char params all 'F'."
  source_example: "*SA{fourcc}FFFFFFFFFFFFFFFF"
- id: not_found
  type: literal
  description: "Generic Not Found - 16-char params all 'N'. Used by setInput when input unavailable."
  source_example: "*SAINPTNNNNNNNNNNNNNNNN"
```

## Variables
```yaml
# Discrete settable parameters that are not pure actions - none beyond the
# parameterized actions already enumerated in Actions.
```

## Events
```yaml
# Unsolicited Notify (N) messages, monitor → client. All use header '*SN'.
- id: fire_power_change
  label: Power Change Notify
  fourcc: POWR
  payload: { "0": standby_off, "1": active_on }
  source_examples:
    - "*SNPOWR0000000000000000"   # powering off
    - "*SNPOWR0000000000000001"   # powering on

- id: fire_input_change
  label: Input Change Notify
  fourcc: INPT
  payload: "input type byte (1/3/4/5) + index 1-9999"
  source_examples:
    - "*SNINPT000000010000XXXX"   # HDMI 1-9999
    - "*SNINPT000000030000XXXX"   # Composite 1-9999
    - "*SNINPT000000040000XXXX"   # Component 1-9999
    - "*SNINPT000000050000XXXX"   # Screen Mirroring 1-9999

- id: fire_volume_change
  label: Volume Change Notify
  fourcc: VOLU
  payload: "16-char decimal volume value"

- id: fire_mute_change
  label: Audio Mute Change Notify
  fourcc: AMUT
  payload: { "0": unmuted, "1": muted }

- id: fire_picture_mute_change
  label: Picture Mute Change Notify
  fourcc: PMUT
  payload: { "0": enabled, "1": disabled }
  notes: "Source polarity is inverted vs. setPictureMute (0=enabled, 1=disabled). Reproduced verbatim from source."
```

## Macros
```yaml
# No explicit multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Power control via setPowerStatus / toggle
# is documented without confirmation semantics.
```

## Notes
- Protocol name: SSIP (Simple IP Control) — Sony BRAVIA Professional Displays proprietary.
- Wire framing: every message is exactly 24 bytes including the trailing 0x0A LF. Implementations MUST NOT send partial or over-long frames.
- Source convention: `#` denotes a no-parameter padding byte (used for toggles and enquiries); `X` denotes a placeholder the client fills; `0`/`1` are literal decimal digit params; `F` denotes error in Answer replies; `N` denotes Not Found.
- Required monitor settings before control works: (1) Settings → Network & Internet → Remote device settings → Control remotely [enabled]; (2) Settings → Network & Internet → Home network → IP control → Simple IP control [enabled].
- Wired and wireless LAN both supported; client and monitor must be on the same network.
- EU region models have 3 RED-DA compliance variants; settings and available commands differ per variant. See https://pro-bravia.sony.net/setup/device-settings/red-da/ .
- Notify polarity quirk: `firePictureMuteChange` uses 0=enabled / 1=disabled, opposite to `setPictureMute`'s 0=disable / 1=enable. Reproduced verbatim per source.
- Netcat one-liner documented by source for testing: `netcat <IP> 20060`.

<!-- UNRESOLVED: source documents Simple IP Control only. RS-232 serial control, REST API (JSON-RPC), and IRCC-IP (SOAP) interfaces exist for the broader Pro BRAVIA family but are out of scope for this refined source. -->
<!-- UNRESOLVED: XBR-xxX800x is a consumer TV line; this spec assumes it inherits the Pro BRAVIA Simple IP Control command set verbatim. Not confirmed against a Sony published X800x-specific document. -->
<!-- UNRESOLVED: maximum audio volume value (clipping ceiling) not stated in source. -->
<!-- UNRESOLVED: setInput index range documented as 1-9999 but actual number of HDMI/Component/Composite inputs on the XBR-xxX800x hardware not stated in this source. -->
<!-- UNRESOLVED: exact byte value to send for '#' padding bytes (ASCII 0x23 vs. 0x00 vs. 0x30) not explicitly defined in source; reproduced as documented. -->
<!-- UNRESOLVED: firmware version compatibility range not stated in source. -->
```

Spec above. 24 actions (incl. parameterized `set_ircc_code` covering 57 IR codes via enum), 8 queries, 5 notify events, full ack/error feedback shapes. All ports/baud/auth from source only — no fabricated values. UNRESOLVED markers on every genuine gap.

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
  - pro.sony
  - files.remotecentral.com
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro.sony/s3/2018/07/19110602/Sony_Protocol-Manual_Supported-Command-List_1st-Edition-Revised-1.pdf
  - https://files.remotecentral.com/library/22-1/sony/index.html
  - https://pro.sony/s3/2018/07/19110324/Sony_Protocol-Manual_1st-Edition-Revised-1.pdf
  - https://files.remotecentral.com/library/22-1/sony/receiver/date.html
retrieved_at: 2026-06-18T08:42:36.115Z
last_checked_at: 2026-06-19T07:54:40.505Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:54:40.505Z
matched_actions: 23
action_count: 23
confidence: medium
summary: "All 23 spec actions match literal FourCC/command tokens in source. Transport (TCP/20060/no-auth) verified. Full bidirectional coverage: spec represents all 11 command families in the source. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source documents Simple IP Control only; serial (RS-232) and REST/IRCC-IP control also exist for Pro BRAVIA family but are not covered by this refined source. Confirm whether XBR-xxX800x consumer variant fully inherits Pro BRAVIA Simple IP Control command set. EU RED-DA variants may alter available commands."
- "source contains no safety warnings, interlock procedures, or"
- "source documents Simple IP Control only. RS-232 serial control, REST API (JSON-RPC), and IRCC-IP (SOAP) interfaces exist for the broader Pro BRAVIA family but are out of scope for this refined source."
- "XBR-xxX800x is a consumer TV line; this spec assumes it inherits the Pro BRAVIA Simple IP Control command set verbatim. Not confirmed against a Sony published X800x-specific document."
- "maximum audio volume value (clipping ceiling) not stated in source."
- "setInput index range documented as 1-9999 but actual number of HDMI/Component/Composite inputs on the XBR-xxX800x hardware not stated in this source."
- "exact byte value to send for '#' padding bytes (ASCII 0x23 vs. 0x00 vs. 0x30) not explicitly defined in source; reproduced as documented."
- "firmware version compatibility range not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
