---
spec_id: admin/lilin-static-models
schema_version: ai4av-public-spec-v1
revision: 1
title: "LILIN Static Models Control Spec"
manufacturer: LILIN
model_family: "LILIN Aida Edge AI Camera"
aliases: []
compatible_with:
  manufacturers:
    - LILIN
  models:
    - "LILIN Aida Edge AI Camera"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - github.com
source_urls:
  - https://github.com/LILINOpenGitHub/LILIN-Edge-Aida-Camera/blob/main/README.md
  - https://github.com/LILINOpenGitHub
  - https://github.com/LILINOpenGitHub/LILIN-Edge-AI-Face-Recognition-Camera/blob/main/README.md
retrieved_at: 2026-06-01T21:34:02.822Z
last_checked_at: 2026-08-30T22:16:56.057Z
generated_at: 2026-08-30T22:16:56.057Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not enumerate specific camera SKUs within the \"Static Models\" family"
  - "firmware version compatibility not stated (single note references Release 2.0.5.54 for counter custom names on 7 series)"
  - "no multi-step sequences explicitly described in source (reload-after-setconfig pattern noted on Actions)"
  - "source contains no safety warnings or interlock procedures."
  - "firmware version compatibility not stated beyond the 2.0.5.54 counter-name note"
  - "RTSP/video stream URLs not covered in this source"
  - "which exact SKUs in the \"Static Models\" family carry the Aida engine"
verification:
  verdict: verified
  checked_at: 2026-08-30T22:16:56.057Z
  matched_actions: 32
  action_count: 32
  confidence: medium
  summary: "All 32 spec actions match source endpoints verbatim; transport (port 8592, basic auth) verified; spec fully covers source command catalogue. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-30
---

# LILIN Static Models Control Spec

## Summary
HTTP CGI API for the Aida deep-learning engine in LILIN (Merit LILIN) IP cameras. Covers license management, AI detection-zone and tripwire configuration, cold-object areas, run-time recognition results (object classification, ANPR, behavior, mask detection), watermark OSD, counters, and HTTP Post event notification. API served over HTTP on port 8592; a websocket variant exists for recognition streaming.

<!-- UNRESOLVED: source does not enumerate specific camera SKUs within the "Static Models" family -->
<!-- UNRESOLVED: firmware version compatibility not stated (single note references Release 2.0.5.54 for counter custom names on 7 series) -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://<serverIP>:8592/"
  port: 8592
auth:
  type: basic  # curl examples use --user "admin:Pass1234"; credentials are unit-specific
```

Notes: camera default IP is 192.168.0.200 with web UI on port 80; API CGI port is 8592. A subset of setconfig operations is also exposed at `http://<serverIP>:80/airelay/setconfig?...`. Websocket `ws://<serverIP>:8592/getalarmmotion` supported for recognition results.

## Traits
```yaml
# - queryable (inferred: many query commands returning state - /server, /getconfig, /get_counter, /getcounting)
traits:
  - queryable
```

## Actions
```yaml
# All commands relative to base_url (http://<serverIP>:8592) unless path includes port-80 airelay variant.
# After any /setconfig write, run "GET /getconfig?reload=1" to save/activate.
- id: set_license_key
  label: Set License Key
  kind: action
  command: "GET /setconfig?ch=about_box&unlocking%20key={unlocking_key}"
  params:
    - name: unlocking_key
      type: string
      description: License unlocking key value

- id: get_license_key
  label: Get License Key
  kind: query
  command: "GET /getconfig?ch=about_box"
  params: []

- id: reload_config
  label: Save and Reload Configuration
  kind: action
  command: "GET /getconfig?reload=1"
  params: []
  notes: "Required after /setconfig writes to make settings active."

- id: query_aida_server_status
  label: Query Aida Server Status
  kind: query
  command: "GET /server"
  params: []
  notes: "Returns DeviceName, Language, LicenseType, LicenseStatus, UnlockingKey."

- id: get_config_all
  label: Get All Aida Config
  kind: query
  command: "GET /getconfig?ch=all"
  params: []

- id: get_config_channel_zone
  label: Get Config For Channel and Detection Zone
  kind: query
  command: "GET /getconfig?ch={ch_id}&detection_zone={zone_id}"
  params:
    - name: ch_id
      type: integer
      description: Channel ID
    - name: zone_id
      type: integer
      description: Detection zone ID (0-based in examples)

- id: get_config_channel_all_zones
  label: Get Config For Channel, All Zones
  kind: query
  command: "GET /getconfig?ch={ch_id}&detection_zone=all"
  params:
    - name: ch_id
      type: integer
      description: Channel ID

- id: get_config_detection_zone_all
  label: Get All Detection Zone Config (no channel)
  kind: query
  command: "GET /getconfig?detection_zone=all"
  params: []

- id: set_zone_count
  label: Set Number of Detection Zones
  kind: action
  command: "GET /setconfig?ch=1&count_zone={zone_num}"
  params:
    - name: zone_num
      type: integer
      description: Number of active detection zones (example enables zones 2, 3)

- id: set_zone_count_airelay
  label: Set Number of Detection Zones (airelay path, port 80)
  kind: action
  command: "GET http://<serverIP>:80/airelay/setconfig?ch=1&count_zone={zone_num}"
  params:
    - name: zone_num
      type: integer
      description: Number of active detection zones

- id: set_config_all
  label: Set Config All Channels
  kind: action
  command: "GET /setconfig?ch=all"
  params: []

- id: set_config_channel_zone
  label: Set Config For Channel and Detection Zone
  kind: action
  command: "GET /setconfig?ch={ch_id}&detection_zone={zone_id}"
  params:
    - name: ch_id
      type: integer
      description: Channel ID
    - name: zone_id
      type: integer
      description: Detection zone ID
  notes: "Additional query params carry the values to set, e.g. &trigger_events=1&checked=1 or &enable_direction1=No."

- id: set_config_channel_all_zones
  label: Set Config For Channel, All Zones
  kind: action
  command: "GET /setconfig?ch={ch_id}&detection_zone=all"
  params:
    - name: ch_id
      type: integer
      description: Channel ID

- id: set_detection_zone_polygon
  label: Set Detection Zone Polygon Coordinates
  kind: action
  command: "GET /setconfig?detection_zone&zone={zone}&x1={x1}&y1={y1}&x2={x2}&y2={y2}&x3={x3}&y3={y3}&x4={x4}&y4={y4}&x5={x5}&y5={y5}&x6={x6}&y6={y6}"
  params:
    - name: zone
      type: integer
      description: Zone number (1-4); source chains multiple zones in one query string
    - name: x1
      type: integer
      description: Point 1 x, view space 889x500
    - name: y1
      type: integer
      description: Point 1 y
    - name: x2
      type: integer
      description: Point 2 x
    - name: y2
      type: integer
      description: Point 2 y
    - name: x3
      type: integer
      description: Point 3 x
    - name: y3
      type: integer
      description: Point 3 y
    - name: x4
      type: integer
      description: Point 4 x
    - name: y4
      type: integer
      description: Point 4 y
    - name: x5
      type: integer
      description: Point 5 x
    - name: y5
      type: integer
      description: Point 5 y
    - name: x6
      type: integer
      description: Point 6 x
    - name: y6
      type: integer
      description: Point 6 y

- id: get_cold_objects
  label: Get Cold Object Zones
  kind: query
  command: "GET /getconfig?coldobjects=all"
  params: []
  notes: "Returns JSON with res_height, res_width, cold_objects[] (X, Y, W, H, Object, Index), up to 8 entries."

- id: set_cold_object_area
  label: Set Cold Object Area
  kind: action
  command: "GET /setconfig?coldobjects&x={x}&y={y}&w={w}&h={h}&Object={object}"
  params:
    - name: x
      type: integer
      description: X position
    - name: y
      type: integer
      description: Y position
    - name: w
      type: integer
      description: Width
    - name: h
      type: integer
      description: Height
    - name: object
      type: string
      description: Object type to suppress (e.g. car, bicycle)

- id: factory_default
  label: Factory Default (without license key)
  kind: action
  command: "GET /system?default=1"
  params: []
  notes: "Resets event setting, detection zone setting, HTTP post. Keeps license key."

- id: factory_default_all
  label: Factory Default (including license key)
  kind: action
  command: "GET /system?default=all"
  params: []

- id: get_recognition_results_http
  label: Get Recognition Results (HTTP poll)
  kind: query
  command: "GET /getalarmmotion"
  params: []
  notes: "Multipart stream (--myboundary); curl example uses --http0.9. Websocket variant: ws://<serverIP>:8592/getalarmmotion."

- id: enable_http_post
  label: Enable HTTP Post Notification
  kind: action
  command: "GET /setevents?ch=notification&enable_post=Yes"
  params: []
  notes: "Follow with GET /getevents?reload=1."

- id: disable_http_post
  label: Disable HTTP Post Notification
  kind: action
  command: "GET /setevents?ch=notification&enable_post=No"
  params: []
  notes: "Follow with GET /getevents?reload=1."

- id: reload_events
  label: Reload Event Configuration
  kind: action
  command: "GET /getevents?reload=1"
  params: []

- id: snapshot
  label: JPEG Snapshot
  kind: query
  command: "GET /snap"
  params: []

- id: set_watermark_osd
  label: Set Watermark OSD
  kind: action
  command: "GET /setosd?x={x}&y={y}&w={w}&h={h}&color={color}&size={size}&sec={sec}&text={text}"
  params:
    - name: x
      type: integer
      description: X position
    - name: y
      type: integer
      description: Y position
    - name: w
      type: integer
      description: Box width
    - name: h
      type: integer
      description: Box height
    - name: color
      type: integer
      description: "Color 0-7"
    - name: size
      type: integer
      description: "Font size 10-30"
    - name: sec
      type: integer
      description: Display dwell in seconds (ms variant: ms=1-10000)
    - name: text
      type: string
      description: Text to display; <BR> breaks line
    - name: id
      type: integer
      description: "Optional box ID 0-15 (15 boxes displayable)"
    - name: bg
      type: integer
      description: "Optional background 0-255"
    - name: outline
      type: integer
      description: "Optional outline 0/1"

- id: set_watermark_osd_timer
  label: Set Watermark OSD Timer Position
  kind: action
  command: "GET /setosdtime?osdtime={osdtime}"
  params:
    - name: osdtime
      type: integer
      description: "0=off, 1=left-top, 2=mid-top, 3=right-top, 4=left-bottom, 5=mid-bottom, 6=right-bottom"

- id: set_radar_speed_metadata
  label: Set Radar Speed Metadata
  kind: action
  command: "GET /setmetadata?speed={speed}&unit={unit}&res_width={res_width}&res_height={res_height}&x={x}&y={y}"
  params:
    - name: speed
      type: integer
      description: Radar speed value
    - name: unit
      type: string
      description: "KM or Mile"
    - name: res_width
      type: integer
      description: "Canvas width (example 800)"
    - name: res_height
      type: integer
      description: "Canvas height (example 600)"
    - name: x
      type: integer
      description: X axis of radar point
    - name: y
      type: integer
      description: Y axis of radar point

- id: reset_all_counters
  label: Reset All Counters
  kind: action
  command: "GET /reset_counter"
  params: []

- id: get_all_counters
  label: Get All Counters
  kind: query
  command: "GET /get_counter"
  params: []

- id: reset_counter
  label: Reset One Counter
  kind: action
  command: "GET /resetcounting?counter_id={counter_id}"
  params:
    - name: counter_id
      type: integer
      description: "Counter ID 1-8"

- id: get_counter
  label: Get One Counter
  kind: query
  command: "GET /getcounting?counter_id={counter_id}"
  params:
    - name: counter_id
      type: integer
      description: "Counter ID 1-8"

- id: get_counter_custom_names
  label: Get Counter Custom Names
  kind: query
  command: "GET /get_counter_cust_name"
  params: []
  notes: "Supported after firmware Release 2.0.5.54 on LILIN 7 series; names set via web GUI."

- id: set_events_file
  label: Modify HTTP Post Content (seteventsfile)
  kind: action
  command: "POST /seteventsfile"
  params:
    - name: body
      type: object
      description: 'JSON body, e.g. {"notification":{"http_post_events":[{},{},{},{},{"post_protocol":"HTTP","post_event_method":"GET","post_event_name":"LVT Notification","post_host_ip":"192.168.0.222","post_host_port":"80","post_timeout":"5","post_url":"/LVTDetection?event=<|behavior_name|>&scene=<|zone_id|>&object=<|name|>","post_username":"admin","post_password":"pass","post_customized_header":""},{},{},{},{}]}} (10 post-event slots)'
  notes: "curl -X POST -H 'Content-Type: application/json' with basic auth."
```

## Feedbacks
```yaml
- id: aida_server_status
  type: object
  fields: [DeviceName, Language, LicenseType, LicenseStatus, UnlockingKey]
  source_action: query_aida_server_status
  notes: >
    LicenseType: 1=No license, 2=Traffic detection, 3=Poker pattern (reserved), 4=Human/Mask, 5=LED digits (reserved),
    6=Sport shoes (reserved), 7=Pose human (reserved), 8=ANPR, 9=Car logos, 104=ToF, 105=Face recognition.
    LicenseStatus: 1=Invalid, 2=Licensed, 3=License/system-ID mismatch, 4=Not initialized, 5=Expired.

- id: recognition_result
  type: object
  fields: [id, channel_id, camera_name, res_height, res_width, confidence, engine_type, label_name, class_id, obj_type, obj_tracking_id, obj_dwell_time, color_id, color, linked_plate, x, y, w, h, parent_idx, detection_zone_id, behavior_id, properties]
  source_action: get_recognition_results_http
  notes: >
    JSON array "AiEngine" plus counter_count[8] and something_vanish_in_zone1..4. properties holds plate/country/area/area_id/logo for ANPR.
    color_id table: 1=Red 2=Orange 3=Yellow 4=Green 5=Blue 6=Indigo 7=Purple 8=Black 9=White 10=Silver.
    Mask engine class_id: 80=Face 81=Half_mask 82=Mask.

- id: cold_objects_config
  type: object
  fields: [res_height, res_width, cold_objects]
  source_action: get_cold_objects

- id: counter_value
  type: integer
  source_action: get_counter
  notes: "Per-counter values 1-8; /get_counter returns all."

- id: counter_custom_names
  type: object
  source_action: get_counter_custom_names

- id: aida_config
  type: object
  source_action: get_config_all
  notes: "Full config.json dump; includes confidence rates and per-zone detection settings."
```

## Variables
```yaml
# All set via /setconfig query parameters (config.json set/get over HTTP CGI per source).
- id: confidence
  type: integer
  range: "0-99"
  description: Confidence rate of ANPR engine
- id: confidence2
  type: integer
  range: "0-99"
  description: Confidence rate of human & car engine
- id: confidence3
  type: integer
  range: "0-99"
  description: Confidence rate of logo engine
- id: confidence4
  type: integer
  range: "0-99"
  description: Confidence rate of human, mask, helmet engine
- id: min_characters
  type: integer
  description: "Minimum plate characters (default 4)"
- id: max_characters
  type: integer
  description: "Maximum plate characters (default 10)"
- id: enable_lpr_db
  type: enum
  values: [Yes, No]
  description: Enable LPR database and snapshots
# Per detection zone (set via /setconfig?ch=<id>&detection_zone=<zone>&<param>=<value>):
- id: enable_direction1
  type: enum
  values: [Yes, No]
  description: Enable directional detection (tripwire)
- id: direction1
  type: integer
  values: [1, 2, 3, 4]
  description: Tripwire direction
- id: enable_tripwire
  type: enum
  values: [Yes, No]
  description: Enable tripwire
- id: metadata1
  type: string
  description: "Car, Truck for detection purpose"
- id: no_parking_time
  type: integer
  description: No-parking time
- id: detection_time
  type: integer
  description: Detection time
- id: link_to_counter
  type: integer
  description: Link zone to counter
- id: count_zone
  type: integer
  description: Number of active detection zones (dedicated set_zone_count action)
```

## Events
```yaml
- id: websocket_recognition_stream
  description: "Unsolicited multipart AiEngine JSON results over ws://<serverIP>:8592/getalarmmotion, --myboundary framed with CamTime header."
- id: http_post_notification
  description: >
    Behavior/metadata notification POSTed to configured host. Supports tokens:
    <%name%>, <%confidence%>, <%left_x%>, <%top_y%>, <%width%>, <%height%>, <%center_x%>, <%center_y%>,
    <%behavior_id%>, <%color%>, <%linked_plate%>, <%plate%>, <%country%>, <%logo%>, <%area%>,
    <%full_image%>, <%crop_image%>, <%pip_image%>, <%counter_count%>. Picture attached as multipart form-data (img, image/jpeg).
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source (reload-after-setconfig pattern noted on Actions)
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings or interlock procedures.
# Note: factory_default_all erases the license key - treat as destructive in integrations.
```

## Notes
- Default camera IP 192.168.0.200; web UI on port 80, API CGI port 8592. LILIN IPScan tool (Windows) discovers cameras.
- All curl examples use HTTP Basic auth with example credentials `admin:Pass1234` — per-unit credentials, not confirmed defaults.
- `/setconfig` writes require follow-up `GET /getconfig?reload=1` to take effect; `setevents` requires `GET /getevents?reload=1`.
- Recognition stream over plain HTTP uses multipart framing; source curl example uses `--http0.9`.
- View setting for detection zones is 889x500 based on tab_view_size; up to 4 alarm zones; up to 8 cold-object entries; counters 1-8 (10 post-event slots in seteventsfile).
- Detection-zone view space and bounding-box canvas (res_width/res_height, e.g. 1920x1080) differ — coordinates in results are relative to res_width/res_height.
- Estimated speed of an object is reported via the `center_speed` parameter (no dedicated endpoint syntax given).
- `/airelay/setconfig` on port 80 mirrors the zone-count setconfig operation.

<!-- UNRESOLVED: firmware version compatibility not stated beyond the 2.0.5.54 counter-name note -->
<!-- UNRESOLVED: RTSP/video stream URLs not covered in this source -->
<!-- UNRESOLVED: which exact SKUs in the "Static Models" family carry the Aida engine -->

## Provenance

```yaml
source_domains:
  - github.com
source_urls:
  - https://github.com/LILINOpenGitHub/LILIN-Edge-Aida-Camera/blob/main/README.md
  - https://github.com/LILINOpenGitHub
  - https://github.com/LILINOpenGitHub/LILIN-Edge-AI-Face-Recognition-Camera/blob/main/README.md
retrieved_at: 2026-06-01T21:34:02.822Z
last_checked_at: 2026-08-30T22:16:56.057Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-30T22:16:56.057Z
matched_actions: 32
action_count: 32
confidence: medium
summary: "All 32 spec actions match source endpoints verbatim; transport (port 8592, basic auth) verified; spec fully covers source command catalogue. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not enumerate specific camera SKUs within the \"Static Models\" family"
- "firmware version compatibility not stated (single note references Release 2.0.5.54 for counter custom names on 7 series)"
- "no multi-step sequences explicitly described in source (reload-after-setconfig pattern noted on Actions)"
- "source contains no safety warnings or interlock procedures."
- "firmware version compatibility not stated beyond the 2.0.5.54 counter-name note"
- "RTSP/video stream URLs not covered in this source"
- "which exact SKUs in the \"Static Models\" family carry the Aida engine"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
