---
spec_id: admin/sony-xbr-xxx805g-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony XBR-xxX805G Series Control Spec"
manufacturer: Sony
model_family: "Sony XBR-xxX805G Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "Sony XBR-xxX805G Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
  - sony.com
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
  - https://pro-bravia.sony.net
  - https://www.sony.com/electronics/support/res/manuals/W000/W0009188M.pdf
retrieved_at: 2026-07-25T17:07:49.110Z
last_checked_at: 2026-08-05T08:47:06.554Z
generated_at: 2026-08-05T08:47:06.554Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Source document is the Sony Pro BRAVIA Simple IP Control spec (pro-bravia.sony.net). It is the canonical SSIP reference but its model-coverage list targets Pro Bravia / BZ / FW series. X805G is a 2019 consumer Android TV with no RS-232 port; SSIP-over-TCP is the documented IP control path. Whether every command (notably setSceneSetting/getSceneSetting, explicitly \"BZ40P / BZ35P / BZ30P: not supported\" in source) applies to X805G is not confirmed by the source — treat scene commands as UNRESOLVED applicability on this model."
  - "firmware version compatibility not stated in source."
  - "EU RED-DA variant — EU area models have 3 spec types; available commands differ. Region of the target X805G not stated."
  - "source marks \"BZ40P / BZ35P / BZ30P: not supported\". X805G applicability unconfirmed."
  - "source contains no safety warnings, interlock procedures, or power-on"
  - "Source is the Sony Pro BRAVIA SSIP reference. Its model-coverage page targets Pro Bravia / BZ / FW professional displays. The X805G is a 2019 consumer Android TV; prior recovery notes flag model-year mismatch and that no first-party X805G-specific protocol doc was located. This spec assumes the consumer X805G implements the same SSIP command set — UNVERIFIED against a real device."
  - "setSceneSetting / getSceneSetting explicitly \"BZ40P / BZ35P / BZ30P: not supported\" in source — applicability to X805G unknown."
  - "Volume min/max range not stated in source."
  - "Input index upper bound stated as 1-9999 but actual available inputs on X805G not enumerated."
  - "IR code list applicability — source IR table is the BRAVIA generic IRCC set; whether all codes function on X805G unverified."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:47:06.554Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions (Actions+Feedbacks) match source SSIP command table; transport port 20060 and TCP verified; spec coverage of source catalogue is complete. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-25
---

# Sony XBR-xxX805G Series Control Spec

## Summary
Sony BRAVIA consumer TV (2019 X805G series, e.g. XBR-65X805G, XBR-75X805G) controlled via Simple IP Control (SSIP) — Sony's fixed-size 24-byte TCP protocol on port 20060. Covers power, volume, mute, input select, picture mute, scene setting, IR-code relay, and broadcast/MAC address queries.

<!-- UNRESOLVED: Source document is the Sony Pro BRAVIA Simple IP Control spec (pro-bravia.sony.net). It is the canonical SSIP reference but its model-coverage list targets Pro Bravia / BZ / FW series. X805G is a 2019 consumer Android TV with no RS-232 port; SSIP-over-TCP is the documented IP control path. Whether every command (notably setSceneSetting/getSceneSetting, explicitly "BZ40P / BZ35P / BZ30P: not supported" in source) applies to X805G is not confirmed by the source — treat scene commands as UNRESOLVED applicability on this model. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: EU RED-DA variant — EU area models have 3 spec types; available commands differ. Region of the target X805G not stated. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none  # inferred: no auth procedure in source
```

Source states: TCP listening port 20060, fixed 24-byte messages, no login procedure described.

## Traits
```yaml
traits:
  - powerable   # inferred: setPowerStatus / togglePowerStatus commands present
  - queryable   # inferred: getPowerStatus / getAudioVolume / getAudioMute / getInput / getPictureMute / getSceneSetting / getBroadcastAddress / getMacAddress present
  - routable    # inferred: setInput (HDMI/Composite/Component/Screen Mirroring) present
  - levelable   # inferred: setAudioVolume (volume level) present
```

## Actions
```yaml
# Message format (all commands): 24 bytes fixed.
#   Byte 0-1   Header   : 0x2A 0x53  ("*S")
#   Byte 2     MsgType  : C=Control, E=Enquiry, A=Answer, N=Notify
#   Byte 3-6   Command  : 4-char FourCC (ASCII)
#   Byte 7-22  Params   : 16 chars (ASCII, "0"-"9"/"F"/"X"/"#"/etc per spec)
#   Byte 23    Footer   : 0x0A (LF)
# Success answer params = "0000000000000000"; error = "FFFFFFFFFFFFFFFF".
# Commands below show the parameterised ASCII body (header+type+FourCC+16 param);
# LF (0x0A) terminator appended at runtime.

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "*SCPOWR000000000000000N"   # N=0 standby/off, N=1 active/on; e.g. *SCPOWR0000000000000000 = Power Off
  params:
    - name: state
      type: enum
      values: ["0", "1"]
      description: "0 = Standby (Off), 1 = Active (On)"

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR################"   # enquiry; reply A with param 0/1, or FFFF... error
  params: []

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW################"   # toggles power; reply A 0000...=success / FFFF...=error
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU00000000000000XX"   # XX = 2-digit decimal volume padded with leading 0s; e.g. 0000000000000029 = vol 29
  params:
    - name: level
      type: integer
      description: "Volume level, 2-digit decimal padded left with 0 (e.g. 29 -> '...0029'). Source gives no min/max; UNRESOLVED."

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################"   # reply A with param = 16-char volume value, or FFFF... error
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT000000000000000N"   # N=0 Unmute, N=1 Mute
  params:
    - name: mute
      type: enum
      values: ["0", "1"]
      description: "0 = Unmute, 1 = Mute"

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT################"   # reply A 0=Not Muted, 1=Muted, FFFF...=error
  params: []

- id: set_input
  label: Set Input
  kind: action
  command: "*SCINPT0000000T0000XXXX"   # T=type digit, XXXX=input index; see params
  params:
    - name: type
      type: enum
      values: ["1", "3", "4", "5"]
      description: "1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring"
    - name: index
      type: integer
      description: "Input index (1-9999), 4-digit decimal padded"

- id: get_input
  label: Get Input
  kind: query
  command: "*SEINPT################"   # reply A with type+index, or NNNN...=Not Found, or FFFF...=error
  params: []

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT000000000000000N"   # N=0 picture mute off, N=1 screen black (picture mute on)
  params:
    - name: state
      type: enum
      values: ["0", "1"]
      description: "0 = Disable picture mute, 1 = Enable picture mute (screen black)"

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "*SEPMUT################"   # reply A 0=disabled, 1=enabled, FFFF...=error
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################"   # toggles picture mute; reply A 0000...=success / FFFF...=error
  params: []

- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  # UNRESOLVED: source marks "BZ40P / BZ35P / BZ30P: not supported". X805G applicability unconfirmed.
  command: "*SCSCEN{scene}###"   # {scene} = case-sensitive ASCII name right-padded with '#'; e.g. 'auto24pSync#####'
  params:
    - name: scene
      type: enum
      values: ["auto", "auto24pSync", "general"]
      description: "Case-sensitive; pad param field to 16 chars with trailing '#'. Reply A 0000...=success, NNNN...=Not available for current input, FFFF...=error."

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  # UNRESOLVED: source marks "BZ40P / BZ35P / BZ30P: not supported". X805G applicability unconfirmed.
  command: "*SESCEN################"   # reply A with scene value, NNNN...=not available, FFFF...=error
  params: []

- id: set_ircc_code
  label: Set IRCC Code (IR Remote Relay)
  kind: action
  command: "*SCIRCC0000000000000NNN"   # NNN = 3-digit IR command code; see IR code table in params/notes
  params:
    - name: code
      type: enum
      description: >-
        Last 3 chars of the 16-char param field = IR code, leading zeros. Verbatim codes from
        source IR Commands table: 005=Display, 006=Home, 007=Options, 008=Return,
        009=Up, 010=Down, 011=Right, 012=Left, 013=Confirm, 014=Red, 015=Green,
        016=Yellow, 017=Blue, 018=Num1, 019=Num2, 020=Num3, 021=Num4, 022=Num5,
        023=Num6, 024=Num7, 025=Num8, 026=Num9, 027=Num0, 030=Volume Up, 031=Volume Down,
        032=Mute, 033=Channel Up, 034=Channel Down, 035=Subtitle, 038=DOT, 050=Picture Off,
        061=Wide, 062=Jump, 076=Sync Menu, 077=Forward, 078=Play, 079=Rewind, 080=Prev,
        081=Stop, 082=Next, 084=Pause, 086=Flash Plus, 087=Flash Minus, 098=TV Power,
        099=Audio, 101=Input, 104=Sleep, 105=Sleep Timer, 108=Video 2, 110=Picture Mode,
        121=Demo Surround, 124=HDMI 1, 125=HDMI 2, 126=HDMI 3, 127=HDMI 4, 129=Action Menu,
        130=Help.

- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "*SEBADReth0############"   # interface name 'eth0' then '#'; reply A with IPv4 broadcast padded right with '#', or FFFF...=error
  params:
    - name: interface
      type: string
      description: "Interface name (source example: 'eth0'); remainder of 16-char param field padded with '#'."

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "*SEMADReth0############"   # reply A with MAC padded right with '#', or FFFF...=error
  params:
    - name: interface
      type: string
      description: "Interface name (source example: 'eth0'); remainder of 16-char param field padded with '#'."
```

## Feedbacks
```yaml
# Query responses / observable state. Answer messages (msg type 'A') returned for each enquiry.
- id: power_state
  type: enum
  values: ["off", "on"]
  # A-POWR 0000...=Standby(Off), ...001=Active(On), FFFF...=Error
- id: audio_volume
  type: integer
  # A-VOLU returns 16-char volume value
- id: audio_mute_state
  type: enum
  values: ["unmuted", "muted"]
  # A-AMUT 0000...=Not Muted, ...001=Muted, FFFF...=Error
- id: input_state
  type: compound
  # A-INPT type+index: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring (index 1-9999); NNNN...=Not Found
- id: picture_mute_state
  type: enum
  values: ["disabled", "enabled"]
  # A-PMUT 0000...=disabled, ...001=enabled, FFFF...=Error
- id: scene_setting_value
  type: string
  # A-SCEN returns scene string; NNNN...=not available for current input; UNRESOLVED on X805G
- id: broadcast_address
  type: string
  # A-BADR returns IPv4 broadcast, right-padded with '#'
- id: mac_address
  type: string
  # A-MADR returns MAC address, right-padded with '#'
```

## Variables
```yaml
# No settable continuous variables beyond action params. Volume is set via set_audio_volume (action).
```

## Events
```yaml
# Unsolicited Notify (msg type 'N') messages pushed from monitor to client.
- id: fire_power_change
  command: "*SNPOWR000000000000000N"
  description: "N=0 powering off, N=1 powering on"
- id: fire_input_change
  command: "*SNINPT0000000T0000XXXX"
  description: "T=1/3/4/5 (HDMI/Composite/Component/Screen Mirroring), XXXX=index"
- id: fire_volume_change
  command: "*SNVOLU00000000000000XX"
  description: "XX = new volume value"
- id: fire_mute_change
  command: "*SNAMUT000000000000000N"
  description: "N=0 unmuting, N=1 muting"
- id: fire_picture_mute_change
  command: "*SNPMUT000000000000000N"
  description: "N=0 picture mute enabled, N=1 picture mute disabled (per source)"
```

## Macros
```yaml
# No multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on
# sequencing requirements. Power command (setPowerStatus) is a direct toggle/set with no
# interlock described.
```

## Notes
- **Protocol name:** SSIP (Sony Simple IP Control). Fixed 24-byte ASCII messages, terminated by LF (0x0A).
- **Required monitor settings before use:** Settings → Network & Internet → Remote device settings → Control remotely (enable); Settings → Network & Internet → Home network → IP control → Simple IP control (enable). Wired + wireless LAN both supported.
- **Answer convention:** `0000000000000000` = success; `FFFFFFFFFFFFFFFF` = error (e.g. invalid params). `################` = no-param placeholder in enquiry/control. `NNNNNNNNNNNNNNNN` = "Not Found" / "Not available for current input".
- **Region caveat (verbatim from source):** "EU area models have 3 types of specifications based on RED-DA compliance. Settings and available commands differ for each specification." Applies notably to getBroadcastAddress / getMacAddress. Target X805G region UNRESOLVED.
- **Example verbatim (Power Off request):** `*SCPOWR0000000000000000`
- **Example verbatim (Power Off response):** `*SAPOWR0000000000000000 *SNPOWR0000000000000000` (answer + notify in same TCP stream).

<!-- UNRESOLVED: Source is the Sony Pro BRAVIA SSIP reference. Its model-coverage page targets Pro Bravia / BZ / FW professional displays. The X805G is a 2019 consumer Android TV; prior recovery notes flag model-year mismatch and that no first-party X805G-specific protocol doc was located. This spec assumes the consumer X805G implements the same SSIP command set — UNVERIFIED against a real device. -->
<!-- UNRESOLVED: setSceneSetting / getSceneSetting explicitly "BZ40P / BZ35P / BZ30P: not supported" in source — applicability to X805G unknown. -->
<!-- UNRESOLVED: Volume min/max range not stated in source. -->
<!-- UNRESOLVED: Input index upper bound stated as 1-9999 but actual available inputs on X805G not enumerated. -->
<!-- UNRESOLVED: IR code list applicability — source IR table is the BRAVIA generic IRCC set; whether all codes function on X805G unverified. -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
  - sony.com
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
  - https://pro-bravia.sony.net
  - https://www.sony.com/electronics/support/res/manuals/W000/W0009188M.pdf
retrieved_at: 2026-07-25T17:07:49.110Z
last_checked_at: 2026-08-05T08:47:06.554Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:47:06.554Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions (Actions+Feedbacks) match source SSIP command table; transport port 20060 and TCP verified; spec coverage of source catalogue is complete. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Source document is the Sony Pro BRAVIA Simple IP Control spec (pro-bravia.sony.net). It is the canonical SSIP reference but its model-coverage list targets Pro Bravia / BZ / FW series. X805G is a 2019 consumer Android TV with no RS-232 port; SSIP-over-TCP is the documented IP control path. Whether every command (notably setSceneSetting/getSceneSetting, explicitly \"BZ40P / BZ35P / BZ30P: not supported\" in source) applies to X805G is not confirmed by the source — treat scene commands as UNRESOLVED applicability on this model."
- "firmware version compatibility not stated in source."
- "EU RED-DA variant — EU area models have 3 spec types; available commands differ. Region of the target X805G not stated."
- "source marks \"BZ40P / BZ35P / BZ30P: not supported\". X805G applicability unconfirmed."
- "source contains no safety warnings, interlock procedures, or power-on"
- "Source is the Sony Pro BRAVIA SSIP reference. Its model-coverage page targets Pro Bravia / BZ / FW professional displays. The X805G is a 2019 consumer Android TV; prior recovery notes flag model-year mismatch and that no first-party X805G-specific protocol doc was located. This spec assumes the consumer X805G implements the same SSIP command set — UNVERIFIED against a real device."
- "setSceneSetting / getSceneSetting explicitly \"BZ40P / BZ35P / BZ30P: not supported\" in source — applicability to X805G unknown."
- "Volume min/max range not stated in source."
- "Input index upper bound stated as 1-9999 but actual available inputs on X805G not enumerated."
- "IR code list applicability — source IR table is the BRAVIA generic IRCC set; whether all codes function on X805G unverified."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
