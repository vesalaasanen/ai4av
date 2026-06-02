---
spec_id: admin/hisense-75u9n
schema_version: ai4av-public-spec-v1
revision: 1
title: "Hisense 75U9N Control Spec"
manufacturer: Hisense
model_family: 75U9N
aliases: []
compatible_with:
  manufacturers:
    - Hisense
  models:
    - 75U9N
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-06-02T01:44:15.938Z
last_checked_at: 2026-04-26T13:12:43.803Z
generated_at: 2026-04-26T13:12:43.803Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source explicitly applies to \"Hisense Prosumer TV\" series; 75U9N is a consumer model and RS-232/IR support is not confirmed. No voltage, current, or model-year data stated. No IR carrier frequency stated. No port number for serial (DB9 D-sub on TV; not a TCP port)."
  - "carrier frequency, modulation parameters, repeat counts not stated in source"
  - "response value mapping for POWR query not explicitly shown in source table"
  - "no unsolicited notification format documented in source."
  - "source contains no explicit safety warnings, electrical ratings, or interlock procedures."
verification:
  verdict: verified
  checked_at: 2026-04-26T13:12:43.803Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 spec actions matched source commands; all 8 extra_in_source tokens from prior verdict now covered. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Hisense 75U9N Control Spec

## Summary
Source document covers the RS-232 and discrete-IR control protocol for the Hisense "Prosumer TV" series (V3.6, 17-Apr-2017). RS-232 uses a 14-byte ASCII frame with a 1-byte 8-bit additive checksum terminated by CR; IR uses Pronto CCF with a 4-byte NEC-style code on a 04FB customer code. The 75U9N is a 2024 consumer model whose applicability to this Prosumer TV protocol is not stated in the source.

<!-- UNRESOLVED: source explicitly applies to "Hisense Prosumer TV" series; 75U9N is a consumer model and RS-232/IR support is not confirmed. No voltage, current, or model-year data stated. No IR carrier frequency stated. No port number for serial (DB9 D-sub on TV; not a TCP port). -->

## Transport
```yaml
# Device exposes two control paths:
#   1. RS-232C serial (bidirectional, command/ack protocol)
#   2. Discrete IR (one-way, 04FB customer code, NEC-style)
protocols:
  - serial
  - ir
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: "DB9 D-sub female on TV (chassis mount)"
  communication_code: "ASCII"
  # Note: pin 9 is "Power Input" / "Power Input/DCD" - exact purpose not stated in source
auth:
  type: none  # inferred: no auth/login procedure in source
ir:
  code_format: "Pronto CCF (4-byte NEC-style payload on customer code 04FB)"
  customer_code: "04FB"
  # UNRESOLVED: carrier frequency, modulation parameters, repeat counts not stated in source
```

## Traits
```yaml
# - powerable       (POWR set + PWRE power-on-command-enable commands present)
# - routable        (INPT set + input-select commands present)
# - queryable       (Q<cmd>???? status queries present for most commands)
# - levelable       (VOLM, BRIT, CONT, COLR, TINT, SHRP, BKLV set commands present)
```

## Actions

### RS-232 Serial — Set Commands

Protocol frame: `S{client_id}{cmd_4}{data_4}{checksum}\r` (14 bytes)
- `client_id`: 3 ASCII chars (0-9, A-F) — last 3 bytes of MAC, or `ALL` for broadcast
- `cmd_4`: 4 ASCII chars (e.g. `POWR`, `INPT`)
- `data_4`: 4 ASCII chars, decimal value for numeric params, 4-digit zero-padded enum for discrete values
- `checksum`: 1 byte — computed so the 8-bit sum of all preceding bytes (including this byte) ≡ 0 (mod 256)
- `\r`: byte `0x0D`

```yaml
- id: pwre_set
  label: "Power-On Command Enable (RS-232 wake)"
  kind: action
  protocol: serial
  command: "S{client_id}PWRE{0000|0001}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3 ASCII hex chars (last 3 of MAC) or 'ALL'"
    - name: data
      type: enum
      values: ["0000", "0001"]
      description: "0000=disable, 0001=enable"
    - name: checksum
      type: integer
      computed: true
      description: "1 byte; sum of preceding bytes mod 256 = 0"

- id: powr_set
  label: "Set Power On/Off"
  kind: action
  protocol: serial
  command: "S{client_id}POWR{0000|0001}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0001"]
      description: "0000=standby, 0001=power on"

- id: inpt_set
  label: "Set Input Source"
  kind: action
  protocol: serial
  command: "S{client_id}INPT{0000|0001|0003|0004|0006|0009|0010|0011|0012}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0001", "0003", "0004", "0006", "0009", "0010", "0011", "0012"]
      description: "0000=next, 0001=TV, 0003=Component, 0004=AV, 0006=VGA, 0009=HDMI1, 0010=HDMI2, 0011=HDMI3, 0012=HDMI4"

- id: pmod_set
  label: "Set Picture Mode"
  kind: action
  protocol: serial
  command: "S{client_id}PMOD{0000|0002|0003|0004|0005|0006}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0002", "0003", "0004", "0005", "0006"]
      description: "0000=Standard, 0002=Vivid, 0003=EnergySaving, 0004=Theater, 0005=Game, 0006=Sport"

- id: brit_set
  label: "Set Brightness"
  kind: action
  protocol: serial
  command: "S{client_id}BRIT{0000-0100}{checksum}\r"
  params:
    - name: data
      type: string
      description: "4 ASCII decimal digits, range 0000-0100 (source states 0000-0100; example values 0000, 0035, 0050, 0100)"

- id: cont_set
  label: "Set Contrast"
  kind: action
  protocol: serial
  command: "S{client_id}CONT{0000-0100}{checksum}\r"
  params:
    - name: data
      type: string
      description: "4 ASCII decimal digits, range 0000-0100"

- id: colr_set
  label: "Set Color Saturation"
  kind: action
  protocol: serial
  command: "S{client_id}COLR{0000-0100}{checksum}\r"
  params:
    - name: data
      type: string
      description: "4 ASCII decimal digits, range 0000-0100"

- id: tint_set
  label: "Set Tint"
  kind: action
  protocol: serial
  command: "S{client_id}TINT{0000-0100}{checksum}\r"
  params:
    - name: data
      type: string
      description: "4 ASCII decimal digits, range 0000-0100"

- id: shrp_set
  label: "Set Sharpness"
  kind: action
  protocol: serial
  command: "S{client_id}SHRP{0000-0020}{checksum}\r"
  params:
    - name: data
      type: string
      description: "4 ASCII decimal digits, range 0000-0020"

- id: aspt_set
  label: "Set Aspect Ratio"
  kind: action
  protocol: serial
  command: "S{client_id}ASPT{0000|0002|0003|0004|0005|0006|0007|0008}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0002", "0003", "0004", "0005", "0006", "0007", "0008"]
      description: "0000=Auto, 0002=Normal, 0003=Zoom, 0004=Wide, 0005=Direct, 0006=1-to-1 pixel map, 0007=Panoramic, 0008=Cinema"

- id: ovsn_set
  label: "Set Overscan"
  kind: action
  protocol: serial
  command: "S{client_id}OVSN{0000|0002}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0002"]
      description: "0000=On, 0002=Off"

- id: rstp_set
  label: "Reset Picture Settings"
  kind: action
  protocol: serial
  command: "S{client_id}RSTP1000{checksum}\r"
  params: []

- id: ctem_set
  label: "Set Color Temperature"
  kind: action
  protocol: serial
  command: "S{client_id}CTEM{0000|0002|0003|0004}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0002", "0003", "0004"]
      description: "0000=High, 0002=Middle, 0003=Mid-Low, 0004=Low"

- id: bklv_set
  label: "Set Backlight"
  kind: action
  protocol: serial
  command: "S{client_id}BKLV{0000-0100}{checksum}\r"
  params:
    - name: data
      type: string
      description: "4 ASCII decimal digits, range 0000-0100"

- id: amod_set
  label: "Set Sound Mode"
  kind: action
  protocol: serial
  command: "S{client_id}AMOD{0000|0002|0003|0004|0005}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0002", "0003", "0004", "0005"]
      description: "0000=Standard, 0002=Theater, 0003=Music, 0004=Speech, 0005=Late night"

- id: rsta_set
  label: "Reset Audio Settings"
  kind: action
  protocol: serial
  command: "S{client_id}RSTA2000{checksum}\r"
  params: []

- id: volm_set
  label: "Set Volume"
  kind: action
  protocol: serial
  command: "S{client_id}VOLM{0000-0100}{checksum}\r"
  params:
    - name: data
      type: string
      description: "4 ASCII decimal digits, range 0000-0100"

- id: mute_set
  label: "Set Mute"
  kind: action
  protocol: serial
  command: "S{client_id}MUTE{0000|0001}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0001"]
      description: "0000=off, 0001=on"

- id: aspk_set
  label: "Set TV Speaker"
  kind: action
  protocol: serial
  command: "S{client_id}ASPK{0000|0002}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0002"]
      description: "0000=Off, 0002=On"

- id: tunr_set
  label: "Set Tuner Mode"
  kind: action
  protocol: serial
  command: "S{client_id}TUNR{0000|0002}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0002"]
      description: "0000=Antenna, 0002=Cable"

- id: tscn_set
  label: "Automatic Channel Search"
  kind: action
  protocol: serial
  command: "S{client_id}TSCN0001{checksum}\r"
  params: []

- id: chan_set
  label: "Channel Up/Down"
  kind: action
  protocol: serial
  command: "S{client_id}CHAN{0000|0001}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0001"]
      description: "0000=channel down, 0001=channel up"

- id: cc_set
  label: "Set Closed Caption"
  kind: action
  protocol: serial
  command: "S{client_id}CC##{0000|0002|0003}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0002", "0003"]
      description: "0000=off, 0002=on, 0003=CC on when mute (## = 2 placeholder chars per source syntax)"

- id: rset_set
  label: "Restore Factory Settings"
  kind: action
  protocol: serial
  command: "S{client_id}RSET9999{checksum}\r"
  params: []

- id: lang_set
  label: "Set OSD Language"
  kind: action
  protocol: serial
  command: "S{client_id}LANG{0000|0002|0003}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0002", "0003"]
      description: "0000=English, 0002=Español, 0003=Français"

- id: pled_set
  label: "Set Standby LED"
  kind: action
  protocol: serial
  command: "S{client_id}PLED{0000|0002}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0002"]
      description: "0000=Off, 0002=On"

- id: bttn_set
  label: "Remote Control Button Simulator"
  kind: action
  protocol: serial
  command: "S{client_id}BTTN1{nnn}{checksum}\r"
  params:
    - name: data
      type: string
      description: "4 ASCII digits; sub-id per BTTN table (e.g. 1000=0, 1001=1, ..., 1012=POWER, 1015=FRW<<, 1016=PLAY, 1017=FFW>>, 1018=PAUSE, 1019=PREVIOUS<<, 1020=STOP, 1021=NEXT>>, 1023=MediaPlayer, 1024=SLEEP, 1027=CC, 1031=MUTE, 1032=VOL-, 1033=VOL+, 1034=CH+, 1035=CH-, 1036=INPUT, 1038=MENU, 1039=ConnectedHome, 1040=OK/ENTER, 1041=UP, 1042=DOWN, 1043=LEFT, 1044=RIGHT, 1045=BACK, 1046=EXIT, 1050=Red, 1051=Green, 1052=Blue, 1053=Yellow, 1054=MTS/SAP, 1055=LiveTV)"

- id: pbtn_set
  label: "Set Power-Off Control Mode"
  kind: action
  protocol: serial
  command: "S{client_id}PBTN{0000|0001}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0001"]
      description: "0000=AC ONLY, 0001=ALL"

- id: mavl_set
  label: "Set Volume Range (Max)"
  kind: action
  protocol: serial
  command: "S{client_id}MAVL{0000-0100}{checksum}\r"
  params:
    - name: data
      type: string
      description: "4 ASCII decimal digits, range 0000-0100"

- id: svol_set
  label: "Set Volume Control Behavior"
  kind: action
  protocol: serial
  command: "S{client_id}SVOL{0000|0001|0002|0003}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0001", "0002", "0003"]
      description: "0000=LOCKED, 0001=LAST VOLUME, 0002=AC RESET, 0003=STANDBY RESET"

- id: vlfl_set
  label: "Set Volume Locked Level"
  kind: action
  protocol: serial
  command: "S{client_id}VLFL{0000-0100}{checksum}\r"
  params:
    - name: data
      type: string
      description: "4 ASCII decimal digits, range 0000-0100"

- id: rmot_set
  label: "Set Remote Key State"
  kind: action
  protocol: serial
  command: "S{client_id}RMOT{0000|0001|0002}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0001", "0002"]
      description: "0000=ENABLE, 0001=DISABLE, 0002=PARTIAL"

- id: panl_set
  label: "Set Panel Key State"
  kind: action
  protocol: serial
  command: "S{client_id}PANL{0000|0001}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0001"]
      description: "0000=ENABLE, 0001=DISABLE"

- id: menu_set
  label: "Set Menu Access"
  kind: action
  protocol: serial
  command: "S{client_id}MENU{0000|0001}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0001"]
      description: "0000=ENABLE, 0001=DISABLE"

- id: avmn_set
  label: "Set AV Setting Menu"
  kind: action
  protocol: serial
  command: "S{client_id}AVMN{0000|0001}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0001"]
      description: "0000=DISABLE, 0001=ENABLE"

- id: osd_set
  label: "Set OSD Mode"
  kind: action
  protocol: serial
  command: "S{client_id}OSD#{0000|0001}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0001"]
      description: "0000=ENABLE, 0001=DISABLE (# = literal char per source syntax)"

- id: inpm_set
  label: "Set Input Mode"
  kind: action
  protocol: serial
  command: "S{client_id}INPM{0000|0001|0002|0003}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0001", "0002", "0003"]
      description: "0000=LOCKED, 0001=SELECTABLE, 0002=AC RESET, 0003=STANDBY RESET"

- id: pois_set
  label: "Set Power-On Input Select"
  kind: action
  protocol: serial
  command: "S{client_id}POIS{0000|0001|0002|0003}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0001", "0002", "0003"]
      description: "0000=LAST, 0001=Air, 0002=AV, 0003=Component (additional values may exist beyond those visible in source - UNRESOLVED)"
```

### RS-232 Serial — Query Commands

Protocol frame: `Q{client_id}{cmd_4}????{checksum}\r` (14 bytes). Acknowledgement: `{client_id}:OKAY{resp_4}{checksum}\r` or `:EROR` / `:WAIT`.

```yaml
- id: pwre_query
  label: "Query Power-On Command Setting"
  kind: query
  protocol: serial
  command: "Q{client_id}PWRE????{checksum}\r"
  response: "{client_id}:OKAY{0|1}{checksum}\r"
  params:
    - name: response_value
      type: enum
      values: ["0", "1"]
      description: "0=disabled, 1=enabled"

- id: powr_query
  label: "Query Power State"
  kind: query
  protocol: serial
  command: "Q{client_id}POWR????{checksum}\r"
  response: "{client_id}:OKAY{0|1}{checksum}\r"
  # UNRESOLVED: response value mapping for POWR query not explicitly shown in source table

- id: inpt_query
  label: "Query Current Input Source"
  kind: query
  protocol: serial
  command: "Q{client_id}INPT????{checksum}\r"
  response: "{client_id}:OKAY{1|3|4|6|9|10|11|12}{checksum}\r"
  params:
    - name: response_value
      type: enum
      values: ["1", "3", "4", "6", "9", "10", "11", "12"]
      description: "1=TV, 3=Component, 4=AV, 6=VGA, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4"

- id: pmod_query
  label: "Query Picture Mode"
  kind: query
  protocol: serial
  command: "Q{client_id}PMOD????{checksum}\r"
  response: "{client_id}:OKAY{0|2|3|4|5|6}{checksum}\r"

- id: brit_query
  label: "Query Brightness"
  kind: query
  protocol: serial
  command: "Q{client_id}BRIT????{checksum}\r"
  response: "{client_id}:OKAY{0000-0100}{checksum}\r"

- id: cont_query
  label: "Query Contrast"
  kind: query
  protocol: serial
  command: "Q{client_id}CONT????{checksum}\r"
  response: "{client_id}:OKAY{0000-0100}{checksum}\r"

- id: colr_query
  label: "Query Color Saturation"
  kind: query
  protocol: serial
  command: "Q{client_id}COLR????{checksum}\r"
  response: "{client_id}:OKAY{0000-0100}{checksum}\r"

- id: tint_query
  label: "Query Tint"
  kind: query
  protocol: serial
  command: "Q{client_id}TINT????{checksum}\r"
  response: "{client_id}:OKAY{0000-0100}{checksum}\r"

- id: shrp_query
  label: "Query Sharpness"
  kind: query
  protocol: serial
  command: "Q{client_id}SHRP????{checksum}\r"
  response: "{client_id}:OKAY{0000-0020}{checksum}\r"

- id: aspt_query
  label: "Query Aspect Ratio"
  kind: query
  protocol: serial
  command: "Q{client_id}ASPT????{checksum}\r"
  response: "{client_id}:OKAY{0|2|3|4|5|6|7|8}{checksum}\r"

- id: ovsn_query
  label: "Query Overscan"
  kind: query
  protocol: serial
  command: "Q{client_id}OVSN????{checksum}\r"
  response: "{client_id}:OKAY{0|2}{checksum}\r"

- id: ctem_query
  label: "Query Color Temperature"
  kind: query
  protocol: serial
  command: "Q{client_id}CTEM????{checksum}\r"
  response: "{client_id}:OKAY{0|2|3|4}{checksum}\r"

- id: bklv_query
  label: "Query Backlight"
  kind: query
  protocol: serial
  command: "Q{client_id}BKLV????{checksum}\r"
  response: "{client_id}:OKAY{0000-0100}{checksum}\r"

- id: amod_query
  label: "Query Sound Mode"
  kind: query
  protocol: serial
  command: "Q{client_id}AMOD????{checksum}\r"
  response: "{client_id}:OKAY{0|2|3|4|5}{checksum}\r"

- id: volm_query
  label: "Query Volume"
  kind: query
  protocol: serial
  command: "Q{client_id}VOLM????{checksum}\r"
  response: "{client_id}:OKAY{0000-0100}{checksum}\r"

- id: mute_query
  label: "Query Mute Status"
  kind: query
  protocol: serial
  command: "Q{client_id}MUTE????{checksum}\r"
  response: "{client_id}:OKAY{0|1}{checksum}\r"
  params:
    - name: response_value
      type: enum
      values: ["0", "1"]
      description: "0=not mute, 1=mute"

- id: aspk_query
  label: "Query TV Speaker"
  kind: query
  protocol: serial
  command: "Q{client_id}ASPK????{checksum}\r"
  response: "{client_id}:OKAY{0|2}{checksum}\r"

- id: tunr_query
  label: "Query Tuner Mode"
  kind: query
  protocol: serial
  command: "Q{client_id}TUNR????{checksum}\r"
  response: "{client_id}:OKAY{0|2}{checksum}\r"

- id: cc_query
  label: "Query Caption Control"
  kind: query
  protocol: serial
  command: "Q{client_id}CC##????{checksum}\r"
  response: "{client_id}:OKAY{0|2|3}{checksum}\r"

- id: lang_query
  label: "Query OSD Language"
  kind: query
  protocol: serial
  command: "Q{client_id}LANG????{checksum}\r"
  response: "{client_id}:OKAY{0|2|3}{checksum}\r"

- id: pled_query
  label: "Query Standby LED"
  kind: query
  protocol: serial
  command: "Q{client_id}PLED????{checksum}\r"
  response: "{client_id}:OKAY{0|2}{checksum}\r"

- id: pbtn_query
  label: "Query Power-Off Control Mode"
  kind: query
  protocol: serial
  command: "Q{client_id}PBTN????{checksum}\r"
  response: "{client_id}:OKAY{0|1}{checksum}\r"

- id: mavl_query
  label: "Query Volume Range"
  kind: query
  protocol: serial
  command: "Q{client_id}MAVL????{checksum}\r"
  response: "{client_id}:OKAY{0000-0100}{checksum}\r"

- id: svol_query
  label: "Query Volume Control"
  kind: query
  protocol: serial
  command: "Q{client_id}SVOL????{checksum}\r"
  response: "{client_id}:OKAY{0|1|2|3}{checksum}\r"

- id: vlfl_query
  label: "Query Volume Locked Level"
  kind: query
  protocol: serial
  command: "Q{client_id}VLFL????{checksum}\r"
  response: "{client_id}:OKAY{0000-0100}{checksum}\r"

- id: rmot_query
  label: "Query Remote Key State"
  kind: query
  protocol: serial
  command: "Q{client_id}RMOT????{checksum}\r"
  response: "{client_id}:OKAY{0|1|2}{checksum}\r"

- id: panl_query
  label: "Query Panel Key State"
  kind: query
  protocol: serial
  command: "Q{client_id}PANL????{checksum}\r"
  response: "{client_id}:OKAY{0|1}{checksum}\r"

- id: menu_query
  label: "Query Menu Access"
  kind: query
  protocol: serial
  command: "Q{client_id}MENU????{checksum}\r"
  response: "{client_id}:OKAY{0|1}{checksum}\r"

- id: avmn_query
  label: "Query AV Setting Menu"
  kind: query
  protocol: serial
  command: "Q{client_id}AVMN????{checksum}\r"
  response: "{client_id}:OKAY{0|1}{checksum}\r"

- id: osd_query
  label: "Query OSD Mode"
  kind: query
  protocol: serial
  command: "Q{client_id}OSD#????{checksum}\r"
  response: "{client_id}:OKAY{0|1}{checksum}\r"

- id: inpm_query
  label: "Query Input Mode"
  kind: query
  protocol: serial
  command: "Q{client_id}INPM????{checksum}\r"
  response: "{client_id}:OKAY{0|1|2|3}{checksum}\r"
```

### IR Discrete Commands

IR code format: 4-byte NEC-style payload `{customer}{data}{data_complement}` transmitted on customer code `04FB`. Listed values are the COMPLETE HEX CODE column from the source. Each code is a separate action.

```yaml
- id: ir_power_toggle
  label: "Power (toggle)"
  kind: action
  protocol: ir
  command: "04FB708F"

- id: ir_power_on
  label: "Power On"
  kind: action
  protocol: ir
  command: "04FB718E"

- id: ir_power_off
  label: "Power Off"
  kind: action
  protocol: ir
  command: "04FB728D"

- id: ir_input_toggle
  label: "Input (toggle)"
  kind: action
  protocol: ir
  command: "04FB738C"

- id: ir_tv_tuner1
  label: "TV Tuner 1"
  kind: action
  protocol: ir
  command: "04FB748B"

- id: ir_hdmi1
  label: "HDMI 1"
  kind: action
  protocol: ir
  command: "04FB7C83"

- id: ir_hdmi2
  label: "HDMI 2"
  kind: action
  protocol: ir
  command: "04FB7D82"

- id: ir_hdmi3
  label: "HDMI 3"
  kind: action
  protocol: ir
  command: "04FB7E81"

- id: ir_hdmi4
  label: "HDMI 4"
  kind: action
  protocol: ir
  command: "04FB7F80"

- id: ir_hdmi5
  label: "HDMI 5"
  kind: action
  protocol: ir
  command: "04FB807F"

- id: ir_vga
  label: "VGA"
  kind: action
  protocol: ir
  command: "04FB817E"

- id: ir_usb
  label: "USB"
  kind: action
  protocol: ir
  command: "04FB827D"

- id: ir_picture_mode_toggle
  label: "Picture Mode (toggle)"
  kind: action
  protocol: ir
  command: "04FB837C"

- id: ir_sound_mode_toggle
  label: "Sound Mode (toggle)"
  kind: action
  protocol: ir
  command: "04FB847B"

- id: ir_aspect_wide
  label: "Aspect Ratio: Wide 16:9"
  kind: action
  protocol: ir
  command: "04FB857A"

- id: ir_aspect_normal
  label: "Aspect Ratio: Normal 4:3"
  kind: action
  protocol: ir
  command: "04FB8679"

- id: ir_aspect_cinema
  label: "Aspect Ratio: Cinema"
  kind: action
  protocol: ir
  command: "04FB8778"

- id: ir_aspect_panorama
  label: "Aspect Ratio: Panorama"
  kind: action
  protocol: ir
  command: "04FB8877"

- id: ir_aspect_zoom
  label: "Aspect Ratio: Zoom"
  kind: action
  protocol: ir
  command: "04FB8976"

- id: ir_channel_list
  label: "Channel List"
  kind: action
  protocol: ir
  command: "04FB8A75"

- id: ir_fav_channel
  label: "Favorite Channel"
  kind: action
  protocol: ir
  command: "04FB8B74"

- id: ir_sleep
  label: "Sleep"
  kind: action
  protocol: ir
  command: "04FB8C73"

- id: ir_tv_menu_toggle
  label: "TV Menu (toggle)"
  kind: action
  protocol: ir
  command: "04FB8D72"

- id: ir_home
  label: "Home"
  kind: action
  protocol: ir
  command: "04FB8E71"

- id: ir_tools
  label: "Tools (Second Menu)"
  kind: action
  protocol: ir
  command: "04FB8F70"

- id: ir_digit_0
  label: "Digit 0"
  kind: action
  protocol: ir
  command: "04FB906F"

- id: ir_digit_1
  label: "Digit 1"
  kind: action
  protocol: ir
  command: "04FB916E"

- id: ir_digit_2
  label: "Digit 2"
  kind: action
  protocol: ir
  command: "04FB926D"

- id: ir_digit_3
  label: "Digit 3"
  kind: action
  protocol: ir
  command: "04FB936C"

- id: ir_digit_4
  label: "Digit 4"
  kind: action
  protocol: ir
  command: "04FB946B"

- id: ir_digit_5
  label: "Digit 5"
  kind: action
  protocol: ir
  command: "04FB956A"

- id: ir_digit_6
  label: "Digit 6"
  kind: action
  protocol: ir
  command: "04FB9669"

- id: ir_digit_7
  label: "Digit 7"
  kind: action
  protocol: ir
  command: "04FB9768"

- id: ir_digit_8
  label: "Digit 8"
  kind: action
  protocol: ir
  command: "04FB9867"

- id: ir_digit_9
  label: "Digit 9"
  kind: action
  protocol: ir
  command: "04FB9966"

- id: ir_digit_dash
  label: "Digit - (dash)"
  kind: action
  protocol: ir
  command: "04FB9A65"

- id: ir_previous_channel
  label: "Previous Channel"
  kind: action
  protocol: ir
  command: "04FB9B64"

- id: ir_arrow_up
  label: "Up Arrow"
  kind: action
  protocol: ir
  command: "04FB9C63"

- id: ir_arrow_down
  label: "Down Arrow"
  kind: action
  protocol: ir
  command: "04FB9D62"

- id: ir_arrow_left
  label: "Left Arrow"
  kind: action
  protocol: ir
  command: "04FB9E61"

- id: ir_arrow_right
  label: "Right Arrow"
  kind: action
  protocol: ir
  command: "04FB9F60"

- id: ir_enter
  label: "Enter"
  kind: action
  protocol: ir
  command: "04FBA05F"

- id: ir_select_ok
  label: "Select (OK)"
  kind: action
  protocol: ir
  command: "04FBA15E"

- id: ir_return
  label: "Return"
  kind: action
  protocol: ir
  command: "04FBA25D"

- id: ir_exit
  label: "Exit"
  kind: action
  protocol: ir
  command: "04FBA35C"

- id: ir_info_display_toggle
  label: "Info/Display (toggle)"
  kind: action
  protocol: ir
  command: "04FBA45B"

- id: ir_volume_down
  label: "Volume -"
  kind: action
  protocol: ir
  command: "04FBA55A"

- id: ir_volume_up
  label: "Volume +"
  kind: action
  protocol: ir
  command: "04FBA659"

- id: ir_channel_down
  label: "Channel -"
  kind: action
  protocol: ir
  command: "04FBA758"

- id: ir_channel_up
  label: "Channel +"
  kind: action
  protocol: ir
  command: "04FBA857"

- id: ir_pip_toggle
  label: "PIP (toggle)"
  kind: action
  protocol: ir
  command: "04FBA956"

- id: ir_pip_input
  label: "PIP Input"
  kind: action
  protocol: ir
  command: "04FBAA55"

- id: ir_pip_swap
  label: "PIP Swap"
  kind: action
  protocol: ir
  command: "04FBAB54"

- id: ir_pip_position
  label: "PIP Position"
  kind: action
  protocol: ir
  command: "04FBAC53"

- id: ir_pip_size
  label: "PIP Size"
  kind: action
  protocol: ir
  command: "04FBAD52"

- id: ir_guide_toggle
  label: "Guide (toggle)"
  kind: action
  protocol: ir
  command: "04FBAE51"

- id: ir_freeze_toggle
  label: "Freeze (toggle)"
  kind: action
  protocol: ir
  command: "04FBAF50"
```

## Feedbacks

```yaml
# Ack frames are 14 bytes: {client_id}:{ACK}{data_4}{checksum}\r
# Common ACKs: OKAY (success), EROR (error), WAIT (busy)
- id: ack_okay
  type: enum
  values: ["OKAY", "EROR", "WAIT"]
  description: "Acknowledgement token returned by TV"

- id: ack_data
  type: string
  description: "4-byte ASCII response payload following :OKAY/EROR/WAIT"

- id: power_state
  type: enum
  values: ["0", "1"]
  description: "From POWR response: 0=standby, 1=power on"

- id: current_input
  type: enum
  values: ["1", "3", "4", "6", "9", "10", "11", "12"]
  description: "From INPT response: 1=TV, 3=Component, 4=AV, 6=VGA, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4"

- id: mute_state
  type: enum
  values: ["0", "1"]
  description: "From MUTE response: 0=not mute, 1=mute"
```

## Variables
```yaml
# Settable numeric parameters (RS-232 only)
- id: brightness
  range: "0000-0100"
  command_set: "BRIT"
  command_query: "BRIT????"
- id: contrast
  range: "0000-0100"
  command_set: "CONT"
  command_query: "CONT????"
- id: color_saturation
  range: "0000-0100"
  command_set: "COLR"
  command_query: "COLR????"
- id: tint
  range: "0000-0100"
  command_set: "TINT"
  command_query: "TINT????"
- id: sharpness
  range: "0000-0020"
  command_set: "SHRP"
  command_query: "SHRP????"
- id: backlight
  range: "0000-0100"
  command_set: "BKLV"
  command_query: "BKLV????"
- id: volume
  range: "0000-0100"
  command_set: "VOLM"
  command_query: "VOLM????"
- id: volume_max
  range: "0000-0100"
  command_set: "MAVL"
  command_query: "MAVL????"
- id: volume_locked_level
  range: "0000-0100"
  command_set: "VLFL"
  command_query: "VLFL????"
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification format documented in source.
# All communication is request/response (Set → Ack, Query → Ack with data).
```

## Macros
```yaml
# Source describes one implicit multi-step sequence (Custom Install menu access for enabling RS-232):
#   1. Power on TV
#   2. Press Quick Settings Menu key on remote
#   3. Enter "7 3 1 0" via number keys
#   4. Scroll to "Custom Installation", set to Enable
#   5. If standby RS-232 wake needed, set "Power On Command" to Enable before exiting
# This is a UI procedure, not a wire-protocol macro.
- id: enable_rs232_port
  label: "Enable RS-232 port (Custom Install menu)"
  steps:
    - "Power on TV"
    - "Press Quick Settings Menu key on remote"
    - "Enter 7-3-1-0 on number keys to open Custom Install menu"
    - "Scroll to Custom Installation; set to Enable"
    - "If standby RS-232 wake required, set Power On Command to Enable"
  notes: "UI procedure documented in source. No wire-level macro format defined."
```

## Safety
```yaml
confirmation_required_for:
  - rset_set        # RSET9999 - restore factory settings, destructive
  - rsta_set        # RSTA2000 - reset audio settings
  - rstp_set        # RSTP1000 - reset picture settings
  - tscn_set        # TSCN0001 - automatic channel search (long-running)
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, electrical ratings, or interlock procedures.
# Pin 9 on the TV's DB9 is labeled "Power Input" / "Power Input/DCD" - purpose not clarified in source.
```

## Notes

- Source document is V3.6 (17-Apr-2017) titled "RS-232/IR Protocol for Hisense® Prosumer TV". No specific model numbers listed in the model field of the source. The 75U9N (2024 consumer model) applicability to this Prosumer protocol is **unverified** — the source applies to a Prosumer series whose exact model lineup is not enumerated in the extracted text.
- The protocol is case-sensitive. Commands are 4 uppercase ASCII characters; mnemonics must be transmitted exactly as documented.
- Checksum algorithm: 1 byte such that the 8-bit sum of every preceding byte in the frame (including the operation byte, client_id, command, data, and the checksum byte itself) is congruent to 0 modulo 256. Implementations should compute the 1-byte two's-complement of the sum of bytes 0..N-1.
- Client ID rules per source: Smart TV uses the last 3 bytes of the Ethernet MAC address; Feature TV uses a value selected in the TV menu. The literal string `ALL` is a broadcast client.
- The RS-232 port on the TV must be explicitly enabled via the Custom Install menu before any serial command will be honored (see Macros section). The default state is disabled.
- The TV may be controlled via RS-232 in standby mode only if the "Power On Command" setting in Custom Install is set to Enable.
- For multi-TV systems, each unit can be addressed by its individual MAC-based client ID; the source documents both single-TV and multi-TV addressing schemes.
- Pinout of the TV-side DB9 (per source): Male shell pins = N/C, RXD, TXD, DTR, GND, DSR, RTS, CTS, Power Input. The source shows both a "Male D-sub 9-pin" and "Female D-sub 9-pin" listing — these are confusingly named in the source (one is clearly describing the mating cable connector and the other the chassis-mount jack on the TV).
- USB-to-Serial adapter required when connecting to a PC with only USB ports (sold separately, per source).
- The 4-byte data field for numeric parameters (BRIT, CONT, COLR, TINT, SHRP, BKLV, VOLM, MAVL, VLFL) is encoded as 4 ASCII decimal digits (e.g. `0050` for value 50, `0100` for value 100), not as raw hex. The example `Set Brightness to 50 → BRIT0050` and `Set Brightness to 100 → BRIT0100` confirms ASCII-decimal encoding.
- IR code is transmitted once per command; source does not document a recommended repeat count.

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-06-02T01:44:15.938Z
last_checked_at: 2026-04-26T13:12:43.803Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T13:12:43.803Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 spec actions matched source commands; all 8 extra_in_source tokens from prior verdict now covered. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source explicitly applies to \"Hisense Prosumer TV\" series; 75U9N is a consumer model and RS-232/IR support is not confirmed. No voltage, current, or model-year data stated. No IR carrier frequency stated. No port number for serial (DB9 D-sub on TV; not a TCP port)."
- "carrier frequency, modulation parameters, repeat counts not stated in source"
- "response value mapping for POWR query not explicitly shown in source table"
- "no unsolicited notification format documented in source."
- "source contains no explicit safety warnings, electrical ratings, or interlock procedures."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
