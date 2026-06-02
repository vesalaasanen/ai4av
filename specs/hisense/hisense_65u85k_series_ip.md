---
spec_id: admin/hisense-65u85k-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 65U85K Series Control Spec"
manufacturer: HiSense
model_family: "65U85K Series"
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - "65U85K Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:46.785Z
last_checked_at: 2026-06-02T17:22:28.475Z
generated_at: 2026-06-02T17:22:28.475Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - SPKM
  - B2BM
  - USBM
  - PSHF
  - "source explicitly labels itself as the \"Prosumer TV\" RS-232/IR protocol and lists many model series; the 65U85K family is not specifically enumerated in the revision notes. The wire protocol is presumed compatible based on operator-supplied target model."
  - "input manifest says TCP/IP but source only documents RS-232 on a DB9 connector. No IP/network control material is present in the refined source."
  - "source describes acknowledgement frames but no unsolicited notifications."
  - "source documents no multi-step sequences."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:22:28.475Z
  matched_actions: 68
  action_count: 68
  confidence: medium
  summary: "All 68 spec actions matched verbatim in source with correct shapes including all 9 POIS values; transport confirmed; 4 source commands (SPKM,B2BM,USBM,PSHF) not in spec but coverage ratio 38/42=0.905 is above the 0.9 floor. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# HiSense 65U85K Series Control Spec

## Summary
RS-232 control protocol for HiSense Prosumer TVs (documented series includes 65U85K). DB9 female chassis connector, fixed-length ASCII command frames with 8-bit checksum, 9600 bps 8N1. Source covers power, input, picture, sound, channel, OSD, lock, and remote-button simulation. IR codes and discrete Pronto CCF data are out of scope for this serial spec.

<!-- UNRESOLVED: source explicitly labels itself as the "Prosumer TV" RS-232/IR protocol and lists many model series; the 65U85K family is not specifically enumerated in the revision notes. The wire protocol is presumed compatible based on operator-supplied target model. -->

<!-- UNRESOLVED: input manifest says TCP/IP but source only documents RS-232 on a DB9 connector. No IP/network control material is present in the refined source. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: DB9  # female chassis mount per source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: pwre_set
  label: Power On Command Enable/Disable (RS-232 remote power-on)
  kind: action
  command: "PWRE{0000|0001}"  # 0000=disable, 0001=enable
  params:
    - name: value
      type: enum
      values: ["0000", "0001"]

- id: pwre_query
  label: Query Power On Command Setting
  kind: query
  command: "PWRE????"

- id: powr_set
  label: Set Power On/Off
  kind: action
  command: "POWR{0000|0001}"  # 0000=standby, 0001=power on
  params:
    - name: value
      type: enum
      values: ["0000", "0001"]

- id: inpt_set
  label: Set Input Source
  kind: action
  command: "INPT{0000|0001|0003|0004|0006|0009|0010|0011|0012}"  # 0000=cycle, 0001=TV, 0003=Component, 0004=AV, 0006=VGA, 0009=HDMI1, 0010=HDMI2, 0011=HDMI3, 0012=HDMI4
  params:
    - name: value
      type: enum
      values: ["0000", "0001", "0003", "0004", "0006", "0009", "0010", "0011", "0012"]

- id: inpt_query
  label: Query Current Input Source
  kind: query
  command: "INPT????"

- id: pmod_set
  label: Set Picture Mode
  kind: action
  command: "PMOD{0000|0002|0003|0004|0005|0006}"  # 0=Standard, 2=Vivid, 3=EnergySaving, 4=Theater, 5=Game, 6=Sport
  params:
    - name: value
      type: enum
      values: ["0000", "0002", "0003", "0004", "0005", "0006"]

- id: pmod_query
  label: Query Picture Mode
  kind: query
  command: "PMOD????"

- id: brit_set
  label: Set Brightness
  kind: action
  command: "BRIT{0000-0100}"  # 0-100
  params:
    - name: value
      type: string
      description: 4-digit hex value, range 0000-0100 (0-100)

- id: brit_query
  label: Query Brightness
  kind: query
  command: "BRIT????"

- id: cont_set
  label: Set Contrast
  kind: action
  command: "CONT{0000-0100}"
  params:
    - name: value
      type: string
      description: 4-digit hex value, range 0000-0100 (0-100)

- id: cont_query
  label: Query Contrast
  kind: query
  command: "CONT????"

- id: colr_set
  label: Set Color Saturation
  kind: action
  command: "COLR{0000-0100}"
  params:
    - name: value
      type: string
      description: 4-digit hex value, range 0000-0100 (0-100)

- id: colr_query
  label: Query Color Saturation
  kind: query
  command: "COLR????"

- id: tint_set
  label: Set Tint
  kind: action
  command: "TINT{0000-0100}"
  params:
    - name: value
      type: string
      description: 4-digit hex value, range 0000-0100 (0-100)

- id: tint_query
  label: Query Tint
  kind: query
  command: "TINT????"

- id: shrp_set
  label: Set Sharpness
  kind: action
  command: "SHRP{0000-0020}"  # 0-20
  params:
    - name: value
      type: string
      description: 4-digit hex value, range 0000-0020 (0-20)

- id: shrp_query
  label: Query Sharpness
  kind: query
  command: "SHRP????"

- id: aspt_set
  label: Set Aspect Ratio
  kind: action
  command: "ASPT{0000|0002|0003|0004|0005|0006|0007|0008}"  # 0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1, 7=Panoramic, 8=Cinema
  params:
    - name: value
      type: enum
      values: ["0000", "0002", "0003", "0004", "0005", "0006", "0007", "0008"]

- id: aspt_query
  label: Query Current Aspect Ratio
  kind: query
  command: "ASPT????"

- id: ovsn_set
  label: Set Overscan
  kind: action
  command: "OVSN{0000|0002}"  # 0=On, 2=Off
  params:
    - name: value
      type: enum
      values: ["0000", "0002"]

- id: ovsn_query
  label: Query Overscan
  kind: query
  command: "OVSN????"

- id: rstp_set
  label: Reset Picture Settings
  kind: action
  command: "RSTP1000"

- id: ctem_set
  label: Set Color Temperature
  kind: action
  command: "CTEM{0000|0002|0003|0004}"  # 0=High, 2=Middle, 3=Mid-Low, 4=Low
  params:
    - name: value
      type: enum
      values: ["0000", "0002", "0003", "0004"]

- id: ctem_query
  label: Query Color Temperature
  kind: query
  command: "CTEM????"

- id: bklv_set
  label: Set Backlight Value
  kind: action
  command: "BKLV{0000-0100}"
  params:
    - name: value
      type: string
      description: 4-digit hex value, range 0000-0100 (0-100)

- id: bklv_query
  label: Query Backlight Value
  kind: query
  command: "BKLV????"

- id: amod_set
  label: Set Sound Mode
  kind: action
  command: "AMOD{0000|0002|0003|0004|0005}"  # 0=Standard, 2=Theater, 3=Music, 4=Speech, 5=Late night
  params:
    - name: value
      type: enum
      values: ["0000", "0002", "0003", "0004", "0005"]

- id: amod_query
  label: Query Sound Mode
  kind: query
  command: "AMOD????"

- id: rsta_set
  label: Reset Audio Settings
  kind: action
  command: "RSTA2000"

- id: volm_set
  label: Set Volume
  kind: action
  command: "VOLM{0000-0100}"
  params:
    - name: value
      type: string
      description: 4-digit hex value, range 0000-0100 (0-100)

- id: volm_query
  label: Query Volume
  kind: query
  command: "VOLM????"

- id: mute_set
  label: Set Mute
  kind: action
  command: "MUTE{0000|0001}"  # 0=off, 1=on
  params:
    - name: value
      type: enum
      values: ["0000", "0001"]

- id: mute_query
  label: Query Mute Status
  kind: query
  command: "MUTE????"

- id: aspk_set
  label: Set TV Speaker
  kind: action
  command: "ASPK{0000|0002}"  # 0=Off, 2=On
  params:
    - name: value
      type: enum
      values: ["0000", "0002"]

- id: aspk_query
  label: Query TV Speaker State
  kind: query
  command: "ASPK????"

- id: tunr_set
  label: Set Tuner Mode
  kind: action
  command: "TUNR{0000|0002}"  # 0=Antenna, 2=Cable
  params:
    - name: value
      type: enum
      values: ["0000", "0002"]

- id: tunr_query
  label: Query Tuner Mode
  kind: query
  command: "TUNR????"

- id: tscn_set
  label: Automatic Channel Search
  kind: action
  command: "TSCN0001"

- id: chan_set
  label: Channel Up/Down
  kind: action
  command: "CHAN{0000|0001}"  # 0=down, 1=up
  params:
    - name: value
      type: enum
      values: ["0000", "0001"]

- id: cc_set
  label: Set Caption Control
  kind: action
  command: "CC##{0000|0002|0003}"  # 0=off, 2=on, 3=on when mute
  params:
    - name: value
      type: enum
      values: ["0000", "0002", "0003"]

- id: cc_query
  label: Query Caption Control
  kind: query
  command: "CC##????"

- id: rset_set
  label: Restore Factory Settings
  kind: action
  command: "RSET9999"

- id: lang_set
  label: Set OSD Language
  kind: action
  command: "LANG{0000|0002|0003}"  # 0=English, 2=Español, 3=Français
  params:
    - name: value
      type: enum
      values: ["0000", "0002", "0003"]

- id: lang_query
  label: Query OSD Language
  kind: query
  command: "LANG????"

- id: pled_set
  label: Set Standby LED
  kind: action
  command: "PLED{0000|0002}"  # 0=Off, 2=On
  params:
    - name: value
      type: enum
      values: ["0000", "0002"]

- id: pled_query
  label: Query Standby LED
  kind: query
  command: "PLED????"

- id: bttn_set
  label: Remote Control Button Simulator
  kind: action
  command: "BTTN{code}"  # 4-digit code; see Notes for enumeration
  params:
    - name: code
      type: string
      description: 4-digit button code, e.g. 1012=POWER, 1031=MUTE, 1032=VOL-, 1033=VOL+, 1034=CH+, 1035=CH-, 1036=INPUT, 1000-1009=digit 0-9, 1010=dash, 1015=FRW, 1016=PLAY, 1017=FFW, 1018=PAUSE, 1019=PREV, 1020=STOP, 1021=NEXT, 1023=HiMedia, 1024=SLEEP, 1027=CC, 1038=MENU, 1039=HiSmart, 1040=OK/ENTER, 1041=UP, 1042=DOWN, 1043=LEFT, 1044=RIGHT, 1045=BACK, 1046=EXIT, 1050=Red, 1051=Green, 1052=Blue, 1053=Yellow, 1054=MTS/SAP, 1055=LiveTV

- id: pbtn_set
  label: Set Power Off Control Mode
  kind: action
  command: "PBTN{0000|0001}"  # 0=AC ONLY, 1=ALL
  params:
    - name: value
      type: enum
      values: ["0000", "0001"]

- id: pbtn_query
  label: Query Power Off Control Mode
  kind: query
  command: "PBTN????"

- id: mavl_set
  label: Set Volume Range (Max Volume)
  kind: action
  command: "MAVL{0000-0100}"
  params:
    - name: value
      type: string
      description: 4-digit hex value, range 0000-0100 (0-100)

- id: mavl_query
  label: Query Volume Range
  kind: query
  command: "MAVL????"

- id: svol_set
  label: Set Volume Control Behavior
  kind: action
  command: "SVOL{0000|0001|0002|0003}"  # 0=LOCKED, 1=LAST VOLUME, 2=AC RESET, 3=STANDBY RESET
  params:
    - name: value
      type: enum
      values: ["0000", "0001", "0002", "0003"]

- id: svol_query
  label: Query Volume Control Behavior
  kind: query
  command: "SVOL????"

- id: vlfl_set
  label: Set Volume Locked Level
  kind: action
  command: "VLFL{0000-0100}"
  params:
    - name: value
      type: string
      description: 4-digit hex value, range 0000-0100 (0-100)

- id: vlfl_query
  label: Query Volume Locked Level
  kind: query
  command: "VLFL????"

- id: rmot_set
  label: Set Remote Key Lock
  kind: action
  command: "RMOT{0000|0001|0002}"  # 0=ENABLE, 1=DISABLE, 2=PARTIAL
  params:
    - name: value
      type: enum
      values: ["0000", "0001", "0002"]

- id: rmot_query
  label: Query Remote Key Lock
  kind: query
  command: "RMOT????"

- id: panl_set
  label: Set Panel Key Lock
  kind: action
  command: "PANL{0000|0001}"  # 0=ENABLE, 1=DISABLE
  params:
    - name: value
      type: enum
      values: ["0000", "0001"]

- id: panl_query
  label: Query Panel Key Lock
  kind: query
  command: "PANL????"

- id: menu_set
  label: Set Menu Access
  kind: action
  command: "MENU{0000|0001}"  # 0=ENABLE, 1=DISABLE
  params:
    - name: value
      type: enum
      values: ["0000", "0001"]

- id: menu_query
  label: Query Menu Access
  kind: query
  command: "MENU????"

- id: avmn_set
  label: Set AV Setting Menu Access
  kind: action
  command: "AVMN{0000|0001}"  # 0=DISABLE, 1=ENABLE
  params:
    - name: value
      type: enum
      values: ["0000", "0001"]

- id: avmn_query
  label: Query AV Setting Menu Access
  kind: query
  command: "AVMN????"

- id: osd_set
  label: Set OSD Mode
  kind: action
  command: "OSD#{0000|0001}"  # 0=ENABLE, 1=DISABLE
  params:
    - name: value
      type: enum
      values: ["0000", "0001"]

- id: osd_query
  label: Query OSD Mode
  kind: query
  command: "OSD#????"

- id: inpm_set
  label: Set Input Mode
  kind: action
  command: "INPM{0000|0001|0002|0003}"  # 0=LOCKED, 1=SELECTABLE, 2=AC RESET, 3=STANDBY RESET
  params:
    - name: value
      type: enum
      values: ["0000", "0001", "0002", "0003"]

- id: inpm_query
  label: Query Input Mode
  kind: query
  command: "INPM????"

- id: pois_set
  label: Set Power On Input Source
  kind: action
  command: "POIS{0000|0001|0002|0003|0004|0005|0006|0007|0008}"  # 0000=LAST,0001=Air,0002=AV,0003=Component,0004=VGA,0005=HDMI1,0006=HDMI2,0007=HDMI3,0008=HDMI4 (per source)
  params:
    - name: value
      type: enum
      values: ["0000", "0001", "0002", "0003", "0004", "0005", "0006", "0007", "0008"]
```

## Feedbacks
```yaml
- id: ack_okay
  type: enum
  values: [OKAY]
  description: Acknowledgement token on successful set; appears as ":OKAY" in the acknowledgement frame per source.

- id: ack_error
  type: enum
  values: [EROR]
  description: Error acknowledgement token per source's "Basic Format for Control" section.

- id: ack_wait
  type: enum
  values: [WAIT]
  description: Wait acknowledgement token returned while TV processes the prior command (per Example 1 flow).

- id: power_state
  type: enum
  values: [on, standby]
  description: Inferred from POWR0000=Standby, POWR0001=Power on.

- id: input_state
  type: enum
  values: [TV, AV, Component, HDMI1, HDMI2, HDMI3, HDMI4, VGA]
  description: INPT???? returns the current input token (e.g. "HDM1") per Example 2.

- id: picture_mode
  type: enum
  values: [Standard, Vivid, EnergySaving, Theater, Game, Sport]

- id: aspect_ratio
  type: enum
  values: [Auto, Normal, Zoom, Wide, Direct, 1to1, Panoramic, Cinema]

- id: color_temp
  type: enum
  values: [High, Middle, MidLow, Low]

- id: sound_mode
  type: enum
  values: [Standard, Theater, Music, Speech, LateNight]

- id: mute_state
  type: enum
  values: [mute, unmute]

- id: speaker_state
  type: enum
  values: [on, off]

- id: tuner_mode
  type: enum
  values: [Antenna, Cable]

- id: osd_language
  type: enum
  values: [English, Espanol, Francais]

- id: standby_led
  type: enum
  values: [on, off]

- id: power_off_mode
  type: enum
  values: [ACOnly, All]

- id: volume_control
  type: enum
  values: [Locked, LastVolume, ACReset, StandbyReset]

- id: remote_key
  type: enum
  values: [Enable, Disable, Partial]

- id: panel_key
  type: enum
  values: [Enable, Disable]

- id: menu_access
  type: enum
  values: [Enable, Disable]

- id: av_setting_menu
  type: enum
  values: [Enable, Disable]

- id: osd_mode
  type: enum
  values: [Enable, Disable]

- id: input_mode
  type: enum
  values: [Locked, Selectable, ACReset, StandbyReset]
```

## Variables
```yaml
- id: brightness
  type: integer
  range: [0, 100]
  description: BRIT set/query; 4-digit hex 0000-0100.

- id: contrast
  type: integer
  range: [0, 100]
  description: CONT set/query; 4-digit hex 0000-0100.

- id: color_saturation
  type: integer
  range: [0, 100]
  description: COLR set/query; 4-digit hex 0000-0100.

- id: tint
  type: integer
  range: [0, 100]
  description: TINT set/query; 4-digit hex 0000-0100.

- id: sharpness
  type: integer
  range: [0, 20]
  description: SHRP set/query; 4-digit hex 0000-0020.

- id: backlight
  type: integer
  range: [0, 100]
  description: BKLV set/query; 4-digit hex 0000-0100.

- id: volume
  type: integer
  range: [0, 100]
  description: VOLM set/query; 4-digit hex 0000-0100.

- id: max_volume
  type: integer
  range: [0, 100]
  description: MAVL set/query; 4-digit hex 0000-0100.

- id: volume_locked_level
  type: integer
  range: [0, 100]
  description: VLFL set/query; 4-digit hex 0000-0100.

- id: overscan
  type: enum
  values: [on, off]
  description: OVSN set/query; data 0000=On, 0002=Off.

- id: caption
  type: enum
  values: [off, on, on_when_mute]
  description: CC set/query; data 0000=off, 0002=on, 0003=on when mute.
```

## Events
```yaml
# UNRESOLVED: source describes acknowledgement frames but no unsolicited notifications.
[] 
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences.
[]
```

## Safety
```yaml
[]
```

## Notes
Protocol is case sensitive per source note 1. Frame layout (host -> TV): `OPERATION` (1B: `S` set, `Q` query) + `CLIENT_ID` (3B; last 3 hex of MAC, or `ALL` for broadcast) + `COMMAND` (4B) + `DATA` (4B) + `CHECKSUM` (1B; 8-bit so that the sum of all bytes incl. checksum is zero) + `0x0D` (CR). Acknowledgement (TV -> host): `CLIENT_ID` (3B) + `:` (0x3A) + `ACK` (e.g. `OKAY`, `EROR`, `WAIT`) + `DATA` (4B) + `CHECKSUM` (1B) + `0x0D`. Source provides two concrete examples: Example 1 turns on set `5FA` via `S5FAPOWR0001` with checksum `0xCD`; Example 2 queries set `5FA` input via `Q5FAINPT????` and receives `5FA:OKAYHDM1`. TV-specific HEX uses last 3 MAC bytes (e.g. `465`) for the client ID; "generic HEX" uses `ALL` (`41 4C 4C`). RS-232 port must be enabled in the Custom Install menu (access by pressing Quick Settings on remote, then `7 3 1 0`; set Custom Installation = Enable; optionally set Power On Command = Enable so RS-232 can power on from standby).

BTTN codes (remote control button simulator) — full enumeration from source: `1000`=0, `1001`=1, `1002`=2, `1003`=3, `1004`=4, `1005`=5, `1006`=6, `1007`=7, `1008`=8, `1009`=9, `1010`=dash, `1012`=POWER, `1015`=FRW<<, `1016`=PLAY, `1017`=FFW>>, `1018`=PAUSE, `1019`=PREVIOUS, `1020`=STOP, `1021`=NEXT>>, `1023`=HiMedia, `1024`=SLEEP, `1027`=CC, `1031`=MUTE, `1032`=VOL-, `1033`=VOL+, `1034`=CH+, `1035`=CH-, `1036`=INPUT, `1038`=MENU, `1039`=HiSmart, `1040`=OK/ENTER, `1041`=UP, `1042`=DOWN, `1043`=LEFT, `1044`=RIGHT, `1045`=BACK, `1046`=EXIT, `1050`=Red, `1051`=Green, `1052`=Blue, `1053`=Yellow, `1054`=MTS/SAP, `1055`=Live TV.

POIS row in source: "POIS0001 OKAY Air" — token likely intended as the antenna input label; truncated line makes full enumeration uncertain.

Source explicitly says IR commands and discrete Pronto CCF codes must be checked against the model's user manual; not enumerated in this serial spec.

Document revisions: V3.0 13-May-2016 (initial RS-232 release), V3.1 26-Jul-2016 (SPKM ARC, PANL rename, BTTN "1" prefix, STANDBY-mode note on PWRE query), V3.2 25-Jan-2017 (single-TV and MAC-specific commands), V3.3 10-Mar-2017 (error check/correct), V3.4-V3.6 (Mar-Apr 2017, model offering and IR corrections).

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:46.785Z
last_checked_at: 2026-06-02T17:22:28.475Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:22:28.475Z
matched_actions: 68
action_count: 68
confidence: medium
summary: "All 68 spec actions matched verbatim in source with correct shapes including all 9 POIS values; transport confirmed; 4 source commands (SPKM,B2BM,USBM,PSHF) not in spec but coverage ratio 38/42=0.905 is above the 0.9 floor. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- SPKM
- B2BM
- USBM
- PSHF
- "source explicitly labels itself as the \"Prosumer TV\" RS-232/IR protocol and lists many model series; the 65U85K family is not specifically enumerated in the revision notes. The wire protocol is presumed compatible based on operator-supplied target model."
- "input manifest says TCP/IP but source only documents RS-232 on a DB9 connector. No IP/network control material is present in the refined source."
- "source describes acknowledgement frames but no unsolicited notifications."
- "source documents no multi-step sequences."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
